import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat.model';
import { JarvisService } from '../services/jarvis.service';
import { ContratSite } from '../models/contrat.site.model';
import { Poste } from '../models/poste.model';
import { ZoneDak } from '../models/zone.model';


@Injectable({
  providedIn: 'root'
})
export class PosteCtrlService {
  URL = 'http://localhost:8080/dakBack/webresources/services/poste/';

  constructor(
    private contratSiteService: JarvisService<ContratSite>,
    private http: HttpClient,
  ) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url + "services/poste/";
    } else {

    }
    this.init();
  }

  async init() {
  }

  async getPostesOfSite(site: ContratSite): Promise<Poste[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "site" + '/' + site.idcontratSite).subscribe({
        next: (data) => {
          const resulats = data as Poste[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getLasts(): Promise<Poste[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "getLasts").subscribe({
        next: (data) => {
          const resulats = data as Poste[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getPostesOfContrat(contrat: Contrat): Promise<Poste[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "contrat" + '/' + contrat.idcontrat).subscribe({
        next: (data) => {
          const resulats = data as Poste[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getPostesByZone(zone: ZoneDak): Promise<Poste[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "zone" + '/' + zone.idzone).subscribe({
        next: (data) => {
          const resulats = data as Poste[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getPostesByName(nom: string): Promise<Poste[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "nom" + '/' + nom.toLowerCase()).subscribe({
        next: (data) => {
          const resulats = data as Poste[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }
}
