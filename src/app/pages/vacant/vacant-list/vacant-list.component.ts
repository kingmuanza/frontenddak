import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { NotifierService } from 'angular-notifier';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Suivi } from 'src/app/models/suivi.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { VigileService } from 'src/app/services/vigile.service';
import { VigileCtrlService } from 'src/app/_services/vigile-ctrl-service';


@Component({
  selector: 'app-vacant-list',
  templateUrl: './vacant-list.component.html',
  styleUrls: ['./vacant-list.component.scss']
})
export class VacantListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  zones = new Array<ZoneDak>();
  zone = new ZoneDak();
  zeroZone = new ZoneDak();
  horaire = 'tous';
  affectations = new Array<Affectation>();
  postesStringOfAffectations = new Array<number>();
  afficher = 'tous';
  postes = new Array<Poste>();
  resultats = new Array<any>();
  lignes = new Array<string>();
  postesSansCodeAgiv = new Array<Poste>();

  loading = false;
  suggestions = new Array<Affectation>();
  poste = new Poste();

  constructor(
    private http: HttpClient,
    private router: Router,
    private posteService: JarvisService<Poste>,
    private zoneService: JarvisService<ZoneDak>,
    private vigileCtrlService: VigileCtrlService,
    private affectationService: JarvisService<Affectation>,
    private posteCtrlService: PosteCtrlService,
    private authService: AuthService,
    private notifierService: NotifierService,
  ) {

  }

  ngOnInit(): void {
    this.importerAffectations();
    this.affectationService.getAll('affectation').then((affectations) => {
      this.affectations = affectations;
      this.postesStringOfAffectations = affectations.filter((aff) => !aff.arret).map((aff) => {
        return aff.idposte.idposte;
      });
      this.zoneService.getAll('zone').then((zones) => {
        console.log('data');
        console.log(zones);
        this.zones = zones;
        this.dtTrigger.next('');
      });
    });
  }

  initZone() {
    this.zone = new ZoneDak();
  }

  importerAffectations() {
    this.http.get('assets/data/affecations-cool3.csv', { responseType: 'text' }).subscribe((data: string) => {
      this.lignes = data.split("\n");
      this.lignes.shift();
      this.lignes = this.lignes.filter((ligne) => {
        let donnees = ligne.split(",");
        return donnees[1] && donnees[1].trim();
      })
      console.log("import terminé", this.lignes.length);
    });
  }

  rechercher(zone?: ZoneDak) {
    this.resultats = new Array<Poste>();
    this.loading = true;
    if (zone && zone.idzone !== 0) {
      this.posteCtrlService.getPostesByZone(zone).then((postes) => {
        this.postes = postes;
        this.resultats = postes.filter((p) => {
          return this.postesStringOfAffectations.indexOf(p.idposte) === -1;
        });
        this.resultats = this.resultats.map((r) => {
          return {
            ...r,
            suggestions: this.rechercherDansAgiv(r),
          }
        });
        this.postesSansCodeAgiv = this.resultats.filter((p) => {
          return !p.codeagiv
        });
        this.loading = false;
        // this.afficherPostes();
      });
    }
  }

  afficherPostes() {
    setTimeout(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }, 500);
  }

  edit(id: string | number) {
    this.router.navigate(['poste', 'view', id]);
  }


  save(poste: Poste) {
    this.posteService.modifier('poste', poste.idposte, poste).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Modification effectuée avec succès");
    }).catch((e) => {
    });
  }

  async getVigileByMatricule(matricule: string): Promise<Vigile> {
    let vigile = await this.vigileCtrlService.getVigileByMatricule(matricule);
    return vigile;
  }

  creerAffectation(aff: Affectation) {
    aff.arret = null;
    // this.closeModal("suggestions");
    this.affectationService.ajouter("affectation", aff).then(() => {
      window.location.reload();
    });
  }

  rechercherDansAgiv(poste: Poste) {
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

  openModal(idElement: string) {
    console.log(`open modal ${idElement}`);
    const modale = document.getElementById(idElement);
    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  closeModal(idElement: string) {
    console.log(`open modal ${idElement}`);
    const modale = document.getElementById(idElement);
    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.hide();
    }
  }

  async ouvrirSuggestions(poste: Poste) {
    this.openModal("suggestions");
    this.poste = poste;
    let suggestions = this.rechercherAffectationDansAGIV(poste);
    this.suggestions = new Array<any>();
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
      this.suggestions.push(aff);
    }
  }

  rechercherAffectationDansAGIV(poste: Poste): Array<any> {
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

  ngOnDestroy(): void {
  }

}
