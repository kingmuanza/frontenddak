import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat.model';
import { JarvisService } from '../services/jarvis.service';
import { ContratSite } from '../models/contrat.site.model';
import { ContratSiteVigile } from '../models/contrat.site.vigile.model';

@Injectable({
  providedIn: 'root'
})
export class SiteCtrlService {
  URL = 'http://localhost:8080/dakBack/webresources/services/site/';

  constructor(
    private contratSiteService: JarvisService<ContratSite>,
    private http: HttpClient,
  ) {
    this.init();
  }

  async init() {
  }

  async getSitesOfContrat(contrat: Contrat): Promise<ContratSite[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "contrat" + '/' + contrat.idcontrat).subscribe({
        next: (data) => {
          const resulats = data as ContratSite[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getExigencesDuSite(site: ContratSite): Promise<ContratSiteVigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + site.idcontratSite + "/exigences").subscribe({
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

}