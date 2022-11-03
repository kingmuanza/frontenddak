import { Injectable } from '@angular/core';
import { Vigile } from '../models/vigile.model';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  constructor() { }

  
  setConges(vigile: Vigile) {
    const annee = new Date().getFullYear();
    if (vigile.dateEntree) {
      const dateDebutConges = new Date(vigile.dateEntree);
      dateDebutConges.setFullYear(annee);
      vigile.debutConge = dateDebutConges;
    }
  }

  calculerDebutProchainConges(vigile: Vigile) {
    const annee = new Date().getFullYear();
    if (vigile.dateEntree) {
      const anneeRecrutement = new Date(vigile.dateEntree).getFullYear();
      let debutProchainConges = new Date(vigile.dateEntree);
      // S'il a été recruté cette année
      if (annee === anneeRecrutement) {
        debutProchainConges.setFullYear(annee + 1);
        vigile.debutConge = debutProchainConges;
      }
      // S'il a été recruté avant cette année
      if (anneeRecrutement < annee) {
        const aujourdhui = new Date();
        debutProchainConges.setFullYear(annee);
        const dateDeSesCongesCetteAnnee = debutProchainConges
        vigile.debutConge = dateDeSesCongesCetteAnnee;
        // S'il a déjà pris ces congés
        if (vigile.debutConge.getTime() < aujourdhui.getTime()) {
          debutProchainConges.setFullYear(annee + 1);
          const dateDeSesCongesCetteAnnee = debutProchainConges
          vigile.debutConge = dateDeSesCongesCetteAnnee;
        }
      }
    }
  }

  calculerConges(vigile: Vigile, dette: number): Vigile {
    const annee = new Date().getFullYear();
    if (vigile.dateEntree) {
      const dateDebutConges = new Date(vigile.dateEntree);
      if (new Date(vigile.dateEntree).getFullYear() === new Date().getFullYear()) {
        dateDebutConges.setFullYear(annee + 1);
      } else {
        dateDebutConges.setFullYear(annee);
      }
      vigile.debutConge = dateDebutConges;
      let dateFinConges = new Date(dateDebutConges);
      dateFinConges.setDate(dateFinConges.getDate() + 21);
      vigile.finConge = dateFinConges;
    }
    if (vigile.debutConge) {
      let dateFinConges = new Date(vigile.debutConge);

      let joursConges = 0;
      while (joursConges < 14 + dette) {
        dateFinConges.setDate(dateFinConges.getDate() + 1);
        const jourDeLaSemaine = dateFinConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
      vigile.finConge = dateFinConges;
    }
    return vigile;
  }

  calculerFin(debutConge: Date, dette: number) {
    let finConge: Date = debutConge;
    if (!dette) {
      dette = 0;
    }
    if (debutConge) {
      let dateFinConges = new Date(debutConge);

      let joursConges = 0;
      while (joursConges < 14 + dette) {
        dateFinConges.setDate(dateFinConges.getDate() + 1);
        const jourDeLaSemaine = dateFinConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
      finConge = dateFinConges;
    }
    return finConge;
  }


}
