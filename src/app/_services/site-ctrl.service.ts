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
    private contratSiteVigileService: JarvisService<ContratSiteVigile>,
    private http: HttpClient,
  ) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url + "services/site/";
    } else {

    }
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

  async supprimerSiteEtExigences(site: ContratSite): Promise<boolean> {
    let exigences = await this.getExigencesDuSite(site);
    for (let index = 0; index < exigences.length; index++) {
      const exigence = exigences[index];
      await this.contratSiteVigileService.supprimerSilent("contratsitevigile", exigence.idcontratSiteVigile);
    }
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "supprimer/" + site.idcontratSite).subscribe({
        next: (data) => {
          const resulats = data as ContratSiteVigile[];
          resolve(true);
        },
        error: (e) => {
          reject(false);
        }
      });
    });
  }

}
