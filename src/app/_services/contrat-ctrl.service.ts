import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat.model';
import { JarvisService } from '../services/jarvis.service';

import { HttpClient } from '@angular/common/http';
import { ContratSiteVigile } from '../models/contrat.site.vigile.model';

@Injectable({
  providedIn: 'root'
})
export class ContratCtrlService {
  URL = 'http://localhost:8080/dakBack/webresources/services/contrat/';

  constructor(
    private contratService: JarvisService<Contrat>,
    private http: HttpClient,
  ) {
    this.init();
  }

  async init() {
  }

  async getHistoriqueDesContrats(contrat: Contrat): Promise<Contrat[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "historique" + '/' + contrat.idcontrat).subscribe({
        next: (data) => {
          const resulats = data as Contrat[];
          resolve(resulats.sort(this.sortByDate()));
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }


  async saveContratEtFils(idcontrat: number, fils: Contrat): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.put(this.URL + "saveHistory" + '/' + idcontrat, fils).subscribe({
        next: (data) => {
          console.log(data);
          resolve();
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getExigencesDuContrat(contrat: Contrat): Promise<ContratSiteVigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + contrat.idcontrat + "/exigences").subscribe({
        next: (data) => {
          const resulats = data as ContratSiteVigile[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  private sortByDate(): ((a: Contrat, b: Contrat) => number) | undefined {
    return (premier, deuxieme) => {
      return new Date(premier.date).getTime() - new Date(deuxieme.date).getTime() > 0 ? -1 : 1;
    };
  }
}
