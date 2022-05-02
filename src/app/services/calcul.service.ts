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

  getBesoinVigiles(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject)  => {
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
    });
  }

}
