import { Injectable } from '@angular/core';
import { Vigile } from '../models/vigile.model';
import { JarvisService } from './jarvis.service';

@Injectable({
  providedIn: 'root'
})
export class ParrainService {

  parrainSelectionnee = false;

  parrains = new Array<Vigile>();
  vigiles = new Array<Vigile>();
  i = 0;

  constructor(
    private vigileService: JarvisService<Vigile>,
  ) { }

  getVigiles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((vigiles) => {
        // console.log('vigiles');
        // console.log(vigiles);
        resolve(vigiles);
      });
    });
  }

  initParrain(vigile: Vigile, vigiles: Array<Vigile>): Promise<Array<Vigile>> {
    return new Promise((resolve, reject) => {
      this.vigiles = vigiles;
        vigiles.forEach((v) => {
          if (vigile.parrain && v.idvigile === vigile.parrain.idvigile) {
            vigile.parrain = v;
            this.parrainSelectionnee = true;
          }
        });
        this.parrainSelectionnee = true;
        this.arborscenceDesParrains(vigile);
        this.parrains = this.ordonnerParrains(this.parrains, vigile);
        resolve(this.parrains);
    });
  }

  getVigileLocalByID(id: number) {
    let vigile = new Vigile();
    this.vigiles.forEach((v) => {
      if (v.idvigile === id) {
        vigile = v;
      }
    });
    return vigile;
  }

  estPresentLeParrain(parrains: Array<Vigile>, idparrain: number) {
    let resultat = false;
    parrains.forEach((parrain) => {
      if (parrain.idvigile === idparrain) {
        resultat = true;
      }
    })
    return resultat;
  }

  arborscenceDesParrains(vigile: Vigile): Array<Vigile> {
    // console.log('parrains vigile ' + this.i);
    // console.log(vigile.idvigile);
    // console.log(vigile.parrain);
    if (this.i < 5) {
      if (vigile.parrain && vigile.parrain !== vigile.idvigile) {
        this.i++;
        if (!this.estPresentLeParrain(this.parrains, vigile.parrain)) {
          let intermediaire = this.arborscenceDesParrains(this.getVigileLocalByID(vigile.parrain));
          intermediaire = this.supprimerDoublons(intermediaire);
          this.parrains = this.parrains.concat(intermediaire);
        }
      }
      if (!this.estPresentLeParrain(this.parrains, vigile.idvigile)) {
        this.parrains.push(vigile);
      }
      // console.log('parrains');
      // console.log(this.parrains);
    }
    this.parrains = this.supprimerDoublons(this.parrains);
    /* this.parrains.sort((vigile, parrain) => {
      if (vigile.idvigile === this.vigile.idvigile) {
        return -100;
      } else {
        return vigile.parrain === parrain.idvigile ? -1: 1;
      }
    }); */
    return this.parrains
  }

  supprimerDoublons(parrains: Array<Vigile>): Array<Vigile> {
    const nouvelleListe = new Array<Vigile>();
    parrains.forEach((element) => {
      if (!this.estPresentLeParrain(nouvelleListe, element.idvigile)) {
        nouvelleListe.push(element)
      }
    });
    return nouvelleListe;
  }

  ordonnerParrains(parrains: Array<Vigile>, vigile: Vigile) {
    return parrains;
  }

}
