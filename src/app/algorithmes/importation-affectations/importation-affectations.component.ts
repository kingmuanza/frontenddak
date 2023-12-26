import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-importation-affectations',
  templateUrl: './importation-affectations.component.html',
  styleUrls: ['./importation-affectations.component.scss']
})
export class ImportationAffectationsComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  lignes = new Array<string>();
  affectations = new Array<Affectation>();
  resultats = new Array<Affectation>();
  affectationsBrutes = new Array<any>();
  postes = new Array<Poste>();
  vigiles = new Array<Vigile>();
  zones = new Array<ZoneDak>();
  zone = new ZoneDak();

  constructor(
    private http: HttpClient,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
    private affectationService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
  ) { }

  ngOnInit(): void {
    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;
    });
    this.vigileService.getAll("vigile").then((vigiles) => {
      this.vigiles = vigiles;
      this.posteService.getAll("poste").then((postes) => {
        this.postes = postes.filter((p) => {
          return p.codeagiv;
        });
        this.http.get('assets/data/affectations-cool5.csv', { responseType: 'text' }).subscribe((data: string) => {

          this.lignes = data.split("\n");
          console.log('lignes', this.lignes.length);
          this.lignes.shift();
          this.lignes.forEach((ligne) => {
            let donnees = ligne.split(",");

            if (donnees[2]) {
              if (!donnees[8]) {
                if (this.getPosteBy(donnees[1])) {
                  let matricule = donnees[2].trim();
                  let matriculeRemplacant = donnees[6].trim();
                  if (matricule.indexOf("N") !== -1 || matricule.indexOf("J")) {

                    matricule = matricule.replace("N", "").replace("J", "").trim();
                    matriculeRemplacant = matriculeRemplacant.replace("N", "").replace("J", "").trim();
                    if (this.getVigileByMatricule(matricule)) {
                      const affectationBrute = {
                        date: donnees[0] ? new Date(donnees[0]) : new Date("2016-01-01"),
                        poste: donnees[1],
                        posteLocal: this.getPosteBy(donnees[1]),
                        matricule: matricule,
                        vigile: this.getVigileByMatricule(matricule),
                        remplacantVigile: this.getVigileByMatricule(matriculeRemplacant),
                        horaire: donnees[4].toLowerCase(),
                        remplacant: donnees[6],
                        jourRepos: donnees[7],
                      };

                      let affectation = new Affectation();
                      affectation.dateAffectation = affectationBrute.date;
                      affectation.horaire = affectationBrute.horaire;
                      affectation.idposte = affectationBrute.posteLocal!;
                      affectation.idvigile = affectationBrute.vigile!;
                      affectation.jourRepos = affectationBrute.jourRepos;
                      affectation.remplacant = affectationBrute.remplacantVigile;

                      this.affectations.push(affectation);
                    }
                  } else {
                    if (this.getVigileByMatricule(matricule)) {
                      const affectationBrute = {
                        date: donnees[0] ? new Date(donnees[0]) : new Date("2016-01-01"),
                        poste: donnees[1],
                        posteLocal: this.getPosteBy(donnees[1]),
                        matricule: matricule,
                        vigile: this.getVigileByMatricule(matricule),
                        remplacantVigile: this.getVigileByMatricule(matriculeRemplacant),
                        horaire: donnees[4].toLowerCase(),
                        remplacant: donnees[6],
                        jourRepos: donnees[7],
                      };

                      let affectation = new Affectation();
                      affectation.dateAffectation = affectationBrute.date;
                      affectation.horaire = affectationBrute.horaire;
                      affectation.idposte = affectationBrute.posteLocal!;
                      affectation.idvigile = affectationBrute.vigile!;
                      affectation.jourRepos = affectationBrute.jourRepos;
                      affectation.remplacant = affectationBrute.remplacantVigile;

                      this.affectations.push(affectation);
                    }
                  }
                }
              }
            }
          });
          this.resultats = this.affectations;
          this.dtTrigger.next("");
        });
      });
    });
  }

  getPosteBy(codeagiv: string): Poste | undefined {
    let postes = this.postes.filter((p) => {
      return p.codeagiv === codeagiv
    });
    if (postes.length > 0) {
      return postes[0];
    } else {
      let postesTests = this.postes.filter((p) => {
        return p.codeagiv === codeagiv.replace("N", "").replace("J", "")
      });
      if (postesTests.length > 0) {
        return postesTests[0];
      }
      return undefined;
    }
  }

  getVigileByMatricule(matricule: string): Vigile | undefined {
    let vigiles = this.vigiles.filter((p) => {
      return p.matricule === matricule;
    });
    if (vigiles.length > 0) {
      return vigiles[0];
    } else {
      return undefined;
    }
  }

  async saveAllAffectations() {
    for (let index = 0; index < this.affectations.length; index++) {
      const affectation = this.affectations[index];
      await this.saveAffectation(affectation);
      console.log("affectations : affectation " + affectation.idposte + " mis à jour");
      let pause = await this.timeout(500);
      console.log(pause);
    }
  }

  saveAffectation(aff: Affectation) {
    console.log(aff.dateAffectation);
    this.affectationService.ajouter("affectation", aff);
    console.log("Affecation mise à jour");
  }

  timeout(ms: number): Promise<string> {
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve("pause");
    }, ms));
  }

  rechercher() {
    this.resultats = this.affectations.filter((aff) => {
      return aff.idposte?.zone.code === this.zone.code;
    })
  }
}
