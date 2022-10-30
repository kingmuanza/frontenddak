import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class JarvisService<T> {
  URL = 'http://localhost:8080/dakBack/webresources/';
  urlSubject = new Subject<string>();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url;
    }
  }

  infos() {
    // console.log(this.URL);
  }

  setServeur(urlServeur: string) {
    this.URL = urlServeur;
    sessionStorage.setItem('serveur-dak', urlServeur);
    this.urlSubject.next(urlServeur);
  }

  showLoader() {
    this.loadingService.afficher();
  }

  hideLoader() {
    this.loadingService.cacher();
  }

  getAll(table: string): Promise<Array<T>> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + table).subscribe({
        next: (data) => {
          const donnees = data as Array<T>;
          this.hideLoader();
          resolve(donnees);
        },
        error: (e) => {
          this.hideLoader();
          reject(e);
        }
      });
    });
  }

  getAllSilent(table: string): Promise<Array<T>> {
    this.infos();
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + table).subscribe({
        next: (data) => {
          const donnees = data as Array<T>;
          resolve(donnees);
        },
        error: (e) => {
          this.hideLoader();
          reject(e);
        }
      });
    });
  }

  get(table: string, id: number): Promise<T> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + table + '/' + id).subscribe({
        next: (data) => {
          const resulat = data as T;
          this.hideLoader();
          resolve(resulat);
        },
        error: (e) => {
          this.hideLoader();
          reject(e);
        }
      });
    });
  }

  ajouter(table: string, objet: T): Promise<any> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.post(this.URL + table, objet).subscribe({
        next: (data) => {
          this.hideLoader();
          resolve(data);
        },
        error: (e) => {
          this.hideLoader();
          reject(e);
        }
      });
    });
  }

  modifier(table: string, id: number, objet: T): Promise<any> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.put(this.URL + table + '/' + id, objet).subscribe({
        next: (data) => {
          const resulat = data as T;
          this.hideLoader();
          resolve(data);
        },
        error: (e) => {
          this.hideLoader();
          reject(e);
        }
      });
    });
  }

  supprimer(table: string, id: number): Promise<boolean> {
    this.infos();
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.delete(this.URL + table + '/' + id).subscribe({
        next: (data) => {
          this.hideLoader();
          resolve(true);
        },
        error: (e) => {
          this.hideLoader();
          reject(e);
        }
      });
    });
  }

  jourSemaine(jour: number) {
    if (jour == 1)
      return "Lundi";
    if (jour == 2)
      return "Mardi";
    if (jour == 3)
      return "Mercredi";
    if (jour == 4)
      return "Jeudi";
    if (jour == 5)
      return "Vendredi";
    if (jour == 6)
      return "Samedi";
    if (jour == 7)
      return "Dimanche";

    return "" + jour ? jour : "";
  }

  libelleFonction(fonction: string) {
    if (fonction == "AGENT")
      return "Agent de sécurité";
    if (fonction == "ESCORTEUR")
      return "Escorteur";
    if (fonction == "CONTROLEUR")
      return "Contrôleur";
    if (fonction == "CHAUFFEUR")
      return "Chauffeur";
    if (fonction == "MAITRECHIEN")
      return "Maitre Chien";
    if (fonction == "ENTRETIEN")
      return "Agent d'entretien";
    if (fonction == "SUPERVISEUR")
      return "Superviseur";

    return "";
  }
}
