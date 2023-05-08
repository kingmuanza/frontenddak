import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { TestConnexionComponent } from 'src/app/composants/test-connexion/test-connexion.component';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  @ViewChild('serveur') testConnexionComponent!: TestConnexionComponent;

  urlServeur = 'http://localhost:8080/dakBack';

  urlServeurs = [
    'http://localhost:8080/dakBack',
    'https://localhost:8181/dakBack'
  ];

  login = "admin";
  passe = "admin";

  autorisation = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  connexion() {
    this.urlServeur = this.testConnexionComponent.getServeur();
    console.log('this.urlServeur');
    console.log(this.urlServeur);
    this.setServeur();

    this.authService.connexion(this.urlServeur, this.login, this.passe).then(() => {
      this.router.navigate(['dashboard']);
    }).catch((e) => {
      this.notifierService.notify('error', e);
    });
  }

  setServeur() {
    this.jarvisService.setServeur(this.urlServeur);
  }

  autoriser() {
    this.autorisation = true;
  }

  onServeurChange() {
    this.autorisation = false;
  }

}

