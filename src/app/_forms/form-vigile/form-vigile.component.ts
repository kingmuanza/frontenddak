import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import * as bootstrap from 'bootstrap';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Affectation } from 'src/app/models/affectation.model';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Quartier } from 'src/app/models/quartier.model';
import { Vigile } from 'src/app/models/vigile.model';
import { Ville } from 'src/app/models/ville.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { ParrainService } from 'src/app/services/parrain.service';

@Component({
  selector: 'app-form-vigile',
  templateUrl: './form-vigile.component.html',
  styleUrls: ['./form-vigile.component.scss']
})
export class FormVigileComponent implements OnInit {

  quartiers = new Array<Quartier>();

  @Input() vigile = new Vigile();
  @Output() onSupprimerEvent = new EventEmitter<Vigile>();
  @Output() onSaveEvent = new EventEmitter<Vigile>();
  affectation: Affectation | null = null;
  processing = false;
  villes = new Array<Ville>();
  vigiles = new Array<Vigile>();
  zones = new Array<ZoneDak>();
  nationalites = new Array<Nationalite>();

  url: any;
  parrainSelectionnee = false;

  parrains = new Array<Vigile>();

  erreursLibelles = {
    datenaiss: 'Veuillez entrer une date de naissance',
    required: 'Ce champ ne peut pas être vide',
    majeur: 'Le vigile doit être majeur',
  }

  erreurs = {
    datenaiss: false,
    nom: false,
    majeur: false,
    cni: false,
    tel: false,
    fonction: false,
    matricule: false,
  }

  montrerErreurs = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private parrainService: ParrainService,
    private vigileService: JarvisService<Vigile>,
    private zoneService: JarvisService<ZoneDak>,
    private quartierService: JarvisService<Quartier>,
    private villeService: JarvisService<Ville>,
    private nationaliteService: JarvisService<Nationalite>,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.getZones().then((zones) => {
      this.zones = zones;
      this.getQuartiers().then((quartiers) => {
        this.quartiers = quartiers;
        this.getVilles().then((villes) => {
          this.villes = villes;
          this.getNationalites().then((nationalites) => {
            this.nationalites = nationalites;
            this.initialiserVigile(villes, zones, nationalites);
          });
        });
      });
    });
  }

  initialiserVigile(villes: any[], zones: any[], nationalites: any[]) {
    this.vigile.copy(this.vigile);

    if (!this.vigile.nom) {
      this.vigile.nom = this.vigile.noms;
    }
    console.log(this.vigile);

    this.initInputsSelect(villes, zones, nationalites);
    this.getVigiles().then((vigiles) => {
      this.vigiles = vigiles;
      this.initParrain(this.vigile, vigiles);
    });

  }

  getVigiles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((vigiles) => {
        // console.log('vigiles');
        // console.log(vigiles);
        resolve(vigiles);
      });
    });
  }

  async initParrain(vigile: Vigile, vigiles: Array<Vigile>) {
    this.parrains = await this.parrainService.initParrain(vigile, vigiles);
    this.parrainSelectionnee = true;
  }

  initInputsSelect(villes: any[], zones: any[], nationalites: any[]) {
    villes.forEach((ville) => {
      if (this.vigile.ville && ville.idville == this.vigile.ville.idville) {
        this.vigile.ville = ville;
      }
    });

    zones.forEach((zone) => {
      if (this.vigile.zone && zone.idzone == this.vigile.zone.idzone) {
        this.vigile.zone = zone;
      }
    });

    nationalites.forEach((nationalite) => {
      if (this.vigile.nationalite && nationalite.idnationalite == this.vigile.nationalite.idnationalite) {
        this.vigile.nationalite = nationalite;
      }
    });
  }

  getVilles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.villeService.getAll('ville').then((villes) => {
        // console.log('villes');
        // console.log(villes);
        resolve(villes);
      });
    });
  }

  getNationalites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.nationaliteService.getAll('nationalite').then((nationalites) => {
        // console.log('nationalites');
        // console.log(nationalites);
        resolve(nationalites);
      });
    });
  }

  getQuartiers(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.quartierService.getAll('quartier').then((quartiers) => {
        // console.log('quartiers');
        // console.log(quartiers);
        resolve(quartiers);
      });
    });
  }

  getZones(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.zoneService.getAll('zone').then((zones) => {
        // console.log('zones');
        // console.log(zones);
        resolve(zones);
      });
    });
  }

  isFormulaireValide(): boolean {
    const isDateNaiss = this.vigile.dteNce ? true : false;
    if (!isDateNaiss) {
      this.erreurs.datenaiss = true;
    }
    const isMajeur = new Date(this.vigile.dteNce).getTime() < Vigile.getDateLimite().getTime();
    if (!isMajeur) {
      this.erreurs.majeur = true;
    }
    const isNom = this.vigile.nom ? true : false;
    if (!isNom) {
      this.erreurs.nom = true;
    }
    const isCNI = this.vigile.mumCni ? true : false;
    if (!isCNI) {
      this.erreurs.cni = true;
    }
    const isTel = this.vigile.tel ? true : false;
    if (!isTel) {
      this.erreurs.tel = true;
    }
    const isFonction = this.vigile.fonction ? true : false;
    if (!isFonction) {
      this.erreurs.fonction = true;
    }
    const isMatricule = this.vigile.matricule ? true : false;
    if (!isMatricule) {
      this.erreurs.matricule = true;
    }
    return isDateNaiss && isMajeur && isNom && isCNI && isTel && isFonction && isMatricule;
  }

  save() {
    if (this.isFormulaireValide()) {
      this.onSaveEvent.emit(this.vigile);
    } else {
      this.afficherLesErreurs();
    }
  }

  afficherLesErreurs() {
    this.montrerErreurs = true;
  }

  remplacant() {
    this.processing = true;
    this.vigile.estRemplacant = true;
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  unRemplacant() {
    this.processing = true;
    this.vigile.estRemplacant = false;
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  supprimer() {
    this.onSupprimerEvent.emit(this.vigile);
  }

  edit(id: string | number) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  libelleFonction(fonction: string) {
    return this.vigileService.libelleFonction(fonction);
  }

  jourSemaine(jour: number) {
    return this.vigileService.jourSemaine(jour);
  }

  voirParrain() {
    console.log('open modal');
    const modale = document.getElementById('parrainModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  fermerParrain() {
    const modale = document.getElementById('exampleModal');

    console.log(modale);
    if (modale != null) {
      const myModal = bootstrap.Modal.getInstance(modale);
      myModal?.hide();
    }
  }
}
