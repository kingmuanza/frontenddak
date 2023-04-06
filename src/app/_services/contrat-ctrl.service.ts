import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat.model';
import { JarvisService } from '../services/jarvis.service';

import { HttpClient } from '@angular/common/http';

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


  private sortByDate(): ((a: Contrat, b: Contrat) => number) | undefined {
    return (premier, deuxieme) => {
      return new Date(premier.date).getTime() - new Date(deuxieme.date).getTime() > 0 ? -1 : 1;
    };
  }
}
