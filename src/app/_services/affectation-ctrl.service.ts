import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Affectation } from '../models/affectation.model';
import { Vigile } from '../models/vigile.model';
import { Poste } from '../models/poste.model';
import { VigileCtrlService } from './vigile-ctrl-service';

@Injectable({
  providedIn: 'root'
})
export class AffectationCtrlService {
  URL = 'http://localhost:8080/dakBack/webresources/services/affectation/';
  lignes = new Array<string>();
  importTerminee = false;

  constructor(
    private http: HttpClient,
    private vigileCtrlService: VigileCtrlService,
  ) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url + "webresources/services/affectation/";
    } else {

    }

    this.importerAffectations().then((lignes) => {
      this.lignes = lignes;
    })
  }

  importerAffectations(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.http.get('assets/data/affectations-cool5.csv', { responseType: 'text' }).subscribe((data: string) => {
        let lignes = data.split("\n");
        lignes.shift();
        lignes = lignes.filter((ligne) => {
          let donnees = ligne.split(",");
          return donnees[1] && donnees[1].trim();
        })
        console.log("import terminé", lignes.length);

        this.importTerminee = true;
        resolve(lignes);
      });
    });
  }

  rechercherPosteDansAgiv(poste: Poste): number {
    if (poste.codeagiv) {
      let resultats = new Array<any>()
      let lignes = this.lignes.filter((ligne) => {
        let donnees = ligne.split(",");
        if (donnees[1]) {
          return donnees[1].trim().indexOf(poste.codeagiv.trim()) !== -1;
        } else {
          return false;
        }
      });
      return lignes.length;
    } else {
      return 0;
    }
  }

  private rechercherAffectationsDansAGIV(poste: Poste): Array<any> {
    if (poste.codeagiv) {
      let resultats = new Array<any>()
      let lignes = this.lignes.filter((ligne) => {
        let donnees = ligne.split(",");
        if (donnees[1]) {
          return donnees[1].trim().indexOf(poste.codeagiv.trim()) !== -1;
        } else {
          return false;
        }
      });
      return lignes.map((ligne) => {
        let donnees = ligne.split(",");
        return donnees;
      });
    } else {
      return [];
    }
  }

  private async getVigileByMatricule(matricule: string): Promise<Vigile> {
    let vigile = await this.vigileCtrlService.getVigileByMatricule(matricule);
    return vigile;
  }

  async getAffectationsInAGIV(poste: Poste): Promise<Array<Affectation>> {
    if (!this.importTerminee) {
      await this.importerAffectations();
    }
    let suggestions = this.rechercherAffectationsDansAGIV(poste);
    let resultats = new Array<Affectation>();
    for (let index = 0; index < suggestions.length; index++) {
      const element = suggestions[index];
      let aff = new Affectation();
      aff.dateAffectation = new Date(element[0]);
      aff.idposte = poste;
      aff.idvigile = await this.getVigileByMatricule(element[2]);
      aff.horaire = element[4];
      aff.remplacant = await this.getVigileByMatricule(element[6]);
      aff.jourRepos = element[7];
      aff.arret = element[8] ? new Date(element[8]) : null;
      resultats.push(aff);
    }
    return resultats
  }

  async getAffectationOfVigile(vigile: Vigile): Promise<Affectation | undefined> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "vigile" + '/' + vigile.idvigile).subscribe({
        next: (data) => {
          const resulat = data as Affectation;
          resolve(resulat);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getAffectationsOfVigile(vigile: Vigile): Promise<Array<Affectation>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "vigile" + '/all/' + vigile.idvigile).subscribe({
        next: (datas) => {
          const resulat = datas as Array<Affectation>;
          resolve(resulat);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getAffectationsOfPoste(poste: Poste): Promise<Array<Affectation>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "poste" + '/' + poste.idposte).subscribe({
        next: (data) => {
          const resulat = data as Array<Affectation>;
          resolve(resulat);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getHistoriqueAffectationsOfPoste(poste: Poste): Promise<Array<Affectation>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "poste" + '/' + poste.idposte + "/historique").subscribe({
        next: (data) => {
          const resulat = data as Array<Affectation>;
          resolve(resulat);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

}
