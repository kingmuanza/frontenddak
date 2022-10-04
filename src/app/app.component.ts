import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { Location } from '@angular/common';

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
  afficherMenu = true;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private location: Location,
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
    this.router.events.subscribe((val) => {
      const url = location.path();
      console.log(url);
      if (location.path().indexOf('connexion') !== -1) {
        this.afficherMenu = false;
      } else {
        this.afficherMenu = true;
      }
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
