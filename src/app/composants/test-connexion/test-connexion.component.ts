import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-test-connexion',
  templateUrl: './test-connexion.component.html',
  styleUrls: ['./test-connexion.component.scss']
})
export class TestConnexionComponent implements OnInit {

  @Output() onConnexionEtablie = new EventEmitter<string>();
  @Output() onConnexionErreur = new EventEmitter<string>();
  @Output() onServeurChange = new EventEmitter<string>();

  urlServeur = 'http://localhost:8080/dakBack';
  jsonFileConfigUrl = '/assets/json/config.json';

  loaderVisible = false;

  urls = [
    'http://localhost:8080/dakBack'
  ];

  constructor(
    private http: HttpClient,
    private notifierService: NotifierService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    console.log('TestConnexionComponent');
    this.getConfigurationFile().then((data) => {
      console.log('Liens vers le serveur');
      console.log(data);
      if (data) {
        this.urls = data;
      }
    });
  }

  getServeur() {
    return this.urlServeur + '/webresources/';
  }

  showLoader() {
    this.loaderVisible = true;
    this.loadingService.afficher();
  }

  hideLoader() {
    this.loaderVisible = false;
    this.loadingService.cacher();
  }

  testerConnexion() {
    this.showLoader();
    this.get(this.urlServeur).then((data) => {
      this.hideLoader();
      this.notifierService.notify('success', "Connexion établie");
      this.onConnexionEtablie.emit(this.urlServeur);
    }).catch((e) => {
      this.hideLoader();
      this.notifierService.notify('error', "Impossible d'établir la connexion avec le serveur : " + this.urlServeur);
      this.onConnexionErreur.emit(this.urlServeur);
    });
  }

  get(url: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.get(url + '/webresources/zone')
        .subscribe({
          next:
            (data) => {
              resolve(data);
            },
          error:
            (error) => {
              reject(error);
            }

        }
        );
    });
  }

  getConfigurationFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.jsonFileConfigUrl).subscribe((response: any) => {
        resolve(response);
      });
    });
  }

  onURLServeurChange() {
    console.log('Le serveur a changé');
    this.onServeurChange.emit('');
  }

}
