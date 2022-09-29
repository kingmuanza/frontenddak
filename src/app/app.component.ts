import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dak';
  user: any;
  userSubscription!: Subscription;
  loading = false;
  loadingSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyCBdaLWw5PsGl13X_jtsHIhHepIZ2bUMrE",
      authDomain: "dak-security.firebaseapp.com",
      projectId: "dak-security",
      storageBucket: "dak-security.appspot.com",
      messagingSenderId: "448692904510",
      appId: "1:448692904510:web:216883edce596209e6276f",
      measurementId: "G-L0FKMS4EQH"
    };
    const app = initializeApp(firebaseConfig);
    this.getUser();
    this.loadingSubscription = this.loadingService.loadingSubject.subscribe((loading) => {
      this.loading = loading;
    });
  }

  getUser() {
    console.log('GET USER');
    this.userSubscription = this.authService.currentUserSubject.subscribe((user) => {
      console.log('userSubscription');
      console.log(user);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.authService.actualiser();
  }

}
