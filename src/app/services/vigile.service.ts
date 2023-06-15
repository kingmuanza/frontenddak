import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vigile } from '../models/vigile.model';
import { JarvisService } from './jarvis.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VigileService {
  URL = 'http://localhost:8080/dakBack/webresources/';
  package = "";
  vigilesSubject = new BehaviorSubject<Array<Vigile>>([]);

  constructor(
    private http: HttpClient,
    private jarvisService: JarvisService<Vigile>,
  ) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url + this.package;
    } else {
      this.URL += this.package;
    }
  }

  async getAll() {
    let donnees = localStorage.getItem("vigiles");
    if (donnees) {
      this.vigilesSubject.next(JSON.parse(donnees));
      return donnees;
    }
    return [];
  }

  async getAllDepuisLeServeur() {
    let data = await this.jarvisService.getAllRange('vigile');
    localStorage.setItem("vigiles", JSON.stringify(data));
    this.vigilesSubject.next(data);
    return data;
  }

  rechercher(texte: string) {
    this.http.get(this.URL + "services/vigile/" + texte).subscribe({
      next: (data) => {
        const donnees = data as Array<Vigile>;
        localStorage.setItem("vigiles", JSON.stringify(data));
        this.vigilesSubject.next(donnees);
      },
      error: (e) => {

      }
    });
  }

  rechercheCalme(texte: string): Promise<Array<Vigile>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "services/vigile/" + texte).subscribe({
        next: (data) => {
          const donnees = data as Array<Vigile>;
          localStorage.setItem("vigiles", JSON.stringify(data));
          resolve(donnees);
        },
        error: (e) => {
          reject("NDEM");
        }
      });
    });
  }


  async trier(titulaire: boolean, estRemplacant: boolean, estRemplacantConge: boolean) {
    console.log("getTitulaires");
    let donnees = localStorage.getItem("vigiles");
    if (donnees) {
      let data = JSON.parse(donnees).filter((vigile: any) => {
        let boolTitulaire = !vigile.estRemplacant && !vigile.estRemplacantConge;
        let boolR = vigile.estRemplacant;
        let boolRC = vigile.estRemplacantConge;

        return (titulaire && boolTitulaire) || (estRemplacant && boolR) || (estRemplacantConge && boolRC);
      });
      this.vigilesSubject.next(data);
      return data;
    }
    return []
  }
}
