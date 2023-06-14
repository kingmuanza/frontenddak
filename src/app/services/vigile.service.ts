import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vigile } from '../models/vigile.model';
import { JarvisService } from './jarvis.service';

@Injectable({
  providedIn: 'root'
})
export class VigileService {

  vigilesSubject = new BehaviorSubject<Array<Vigile>>([]);

  constructor(

    private jarvisService: JarvisService<Vigile>,
  ) { }

  async getAll() {
    let donnees = localStorage.getItem("vigiles");
    if (donnees) {
      this.vigilesSubject.next(JSON.parse(donnees));
    }
  }

  async getAllDepuisLeServeur() {
    let data = await this.jarvisService.getAll('vigile');
    localStorage.setItem("vigiles", JSON.stringify(data));
    this.vigilesSubject.next(data);
    return data;
  }

  async getTitulaires() {
    console.log("getTitulaires");
    let donnees = localStorage.getItem("vigiles");
    if (donnees) {
      let data = JSON.parse(donnees).filter((vigile: any) => {
        return !vigile.estRemplacant && !vigile.estRemplacantConge;
      });
      this.vigilesSubject.next(data);
    }
  }

  async getRemplacants() {
    console.log("getTitulaires");
    let donnees = localStorage.getItem("vigiles");
    if (donnees) {
      let data = JSON.parse(donnees).filter((vigile: any) => {
        return vigile.estRemplacant;
      });
      this.vigilesSubject.next(data);
    }
  }
  async getRemplacantsConges() {
    console.log("getTitulaires");
    let donnees = localStorage.getItem("vigiles");
    if (donnees) {
      let data = JSON.parse(donnees).filter((vigile: any) => {
        return vigile.estRemplacantConge;
      });
      this.vigilesSubject.next(data);
    }
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
    }
  }
}
