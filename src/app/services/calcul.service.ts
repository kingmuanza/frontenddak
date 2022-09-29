import { Injectable } from '@angular/core';
import { Poste } from '../models/poste.model';
import { Vigile } from '../models/vigile.model';
import { ZoneDak } from '../models/zone.model';
import { BesoinVigile } from '../structures/besoin.vigile';
import { JarvisService } from './jarvis.service';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  constructor(
    private zoneService: JarvisService<ZoneDak>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
  ) { }

  getBesoinEnVigilesEnFonctionDesPostes(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject) => {
      this.posteService.getAll('poste').then((postes) => {
        postes.forEach((poste) => {
          if (poste.nombreVigileJour) {
            besoinVigile.nbBesoinVigilesJour += poste.nombreVigileJour;
          }
          if (poste.nombreVigileNuit) {
            besoinVigile.nbBesoinVigilesNuit += poste.nombreVigileNuit;
          }
        });
        resolve(besoinVigile);
      });

    });
  }

  getVigilesEngagesActu(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((vigiles) => {
        console.log('vigiles');
        console.log(vigiles);
        vigiles.forEach((vigile) => {
          if (!vigile.estRemplacant) {
            if (vigile.horaire === 'jour') {
              besoinVigile.nbVigilesJour += 1;
            }
            if (vigile.horaire === 'nuit') {
              besoinVigile.nbVigilesNuit += 1;
            }
          }
        });
        resolve(besoinVigile);
      });
    });
  }

  getBesoinVigiles(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject) => {
      this.getVigilesEngagesActu().then((vigilesEngagesActu) => {
        besoinVigile.nbVigilesJour = vigilesEngagesActu.nbVigilesJour;
        besoinVigile.nbVigilesNuit = vigilesEngagesActu.nbVigilesNuit;
        this.getBesoinEnVigilesEnFonctionDesPostes().then((besoinEnVigilesEnFonctionDesPostes) => {
          besoinVigile.nbBesoinVigilesJour = besoinEnVigilesEnFonctionDesPostes.nbBesoinVigilesJour;
          besoinVigile.nbBesoinVigilesNuit = besoinEnVigilesEnFonctionDesPostes.nbBesoinVigilesNuit;
          resolve(besoinVigile);
        });
      });
    });
  }

}
