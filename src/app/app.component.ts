import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dak';
  user: any;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
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
  }

  getUser() {
    console.log('GET USER');
    this.userSubscription = this.authService.currentUserSubject.subscribe((user) => {
      console.log('userSubscription');
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
    this.authService.actualiser();
  }

  deconnexion() {
    const oui = confirm("Etes vous sûr de vouloir vous déconnecter ?");
    if (oui) {
      this.authService.deconnexion().then(()=> {
        this.router.navigate(['connexion']);
      });
    }
  }
}
