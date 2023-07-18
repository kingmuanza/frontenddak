import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as bootstrap from 'bootstrap';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Quartier } from 'src/app/models/quartier.model';
import { Vigile } from 'src/app/models/vigile.model';
import { Ville } from 'src/app/models/ville.model';
import { CalculService } from 'src/app/services/calcul.service';
import { CongeService } from 'src/app/services/conge.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { ParrainService } from 'src/app/services/parrain.service';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-form-vigile',
  templateUrl: './form-vigile.component.html',
  styleUrls: ['./form-vigile.component.scss']
})
export class FormVigileComponent implements OnInit, OnChanges {

  @Output() onSupprimerEvent = new EventEmitter<Vigile>();
  @Output() onSaveEvent = new EventEmitter<Vigile>();

  @Input() vigile = new Vigile();
  @Input() quartiers = new Array<Quartier>();
  @Input() villes = new Array<Ville>();
  @Input() vigiles = new Array<Vigile>();
  @Input() nationalites = new Array<Nationalite>();

  url: any;
  parrainSelectionnee = false;

  parrains = new Array<Vigile>();
  rechercheVigile = "";

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
    dateEntree: false,
  }

  montrerErreurs = false;

  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private parrainService: ParrainService,
    private congeService: CongeService,
    private vigileService: JarvisService<Vigile>,
    private vigileCtrlService: VigileService,
    private calculService: CalculService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
    console.log(changes);
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    console.log('init');
    this.initialiserVigile(this.villes, this.quartiers, this.nationalites);
  }

  initialiserVigile(villes: Array<Ville>, quartiers: Array<Quartier>, nationalites: Array<Nationalite>) {

    if (!this.vigile.nom) {
      this.vigile.nom = this.vigile.noms;
    }
    console.log(this.vigile);

    this.initInputsSelect(villes, quartiers, nationalites);
    this.initParrain(this.vigile, []);

  }

  getVigiles(texte: string) {
    this.vigileCtrlService.rechercheCalme(texte).then((vigiles) => {
      this.vigiles = vigiles;
    });
  }

  async initParrain(vigile: Vigile, vigiles: Array<Vigile>) {
    if (vigile.parrain) {
      this.vigileService.get("vigile", vigile.parrain).then((v) => {
        this.vigiles = [v];
        this.parrainSelectionnee = true;
      });
    } else {
      this.vigiles = [];
      this.parrainSelectionnee = true;
    }
  }

  initInputsSelect(villes: Array<Ville>, quartiers: Array<Quartier>, nationalites: Array<Nationalite>) {

    villes.forEach((ville) => {
      if (this.vigile.ville && ville.idville == this.vigile.ville.idville) {
        this.vigile.ville = ville;
      }
    });
    quartiers.forEach((q) => {
      if (this.vigile.quartier && q.idquartier === this.vigile.quartier.idquartier) {
        this.vigile.quartier = q;
      }
    });

    nationalites.forEach((nationalite) => {
      if (this.vigile.nationalite && nationalite.idnationalite == this.vigile.nationalite.idnationalite) {
        this.vigile.nationalite = nationalite;
      }
    });
  }

  isFormulaireValide(): boolean {
    const isDateNaiss = this.vigile.dteNce ? true : false;
    if (!isDateNaiss) {
      this.erreurs.datenaiss = true;
    } else {
      this.erreurs.datenaiss = false;
    }
    const isMajeur = new Date(this.vigile.dteNce).getTime() < Vigile.getDateLimite().getTime();
    if (!isMajeur) {
      this.erreurs.majeur = true;
    } else {
      this.erreurs.majeur = false;
    }
    const isNom = this.vigile.nom ? true : false;
    if (!isNom) {
      this.erreurs.nom = true;
    } else {
      this.erreurs.nom = false;
    }
    const isCNI = this.vigile.mumCni ? true : false;
    if (!isCNI) {
      this.erreurs.cni = true;
    } else {
      this.erreurs.cni = false;
    }
    const isTel = this.isTel(this.vigile.tel);
    if (!isTel) {
      this.erreurs.tel = true;
    } else {
      this.erreurs.tel = false;
    }
    const isFonction = this.vigile.fonction ? true : false;
    if (!isFonction) {
      this.erreurs.fonction = true;
    } else {
      this.erreurs.fonction = false;
    }
    const isMatricule = this.vigile.matricule ? true : false;
    if (!isMatricule) {
      this.erreurs.matricule = true;
    } else {
      this.erreurs.matricule = false;
    }

    const isDateEntree = !!this.vigile.dateEntree;
    this.erreurs.dateEntree = !this.vigile.dateEntree;
    return isDateNaiss && isMajeur && isNom && isCNI && isTel && isFonction && isMatricule && isDateEntree;
  }

  isTel(numero: string): boolean {
    return this.calculService.isTel(numero);
  }

  save() {
    this.montrerErreurs = false;
    if (this.isFormulaireValide()) {
      if (true/* this.vigile.idvigile !== 0 */) {
        this.vigile = this.congeService.calculerConges(this.vigile, 0);
        this.vigile.finConge = this.congeService.calculerFin(this.vigile.debutConge, this.vigile.detteConges);
      }
      this.onSaveEvent.emit(this.vigile);
    } else {
      this.afficherLesErreurs();
    }
  }

  afficherLesErreurs() {
    this.montrerErreurs = true;
  }

  remplacant() {
    this.vigile.estRemplacant = true;
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
    });
  }

  unRemplacant() {
    this.vigile.estRemplacant = false;
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
    });
  }

  supprimer() {
    this.onSupprimerEvent.emit(this.vigile);
  }

  libelleFonction(fonction: string) {
    return this.vigileService.libelleFonction(fonction);
  }

  libelleStatut(fonction: string) {
    return this.vigileService.libelleStatut(fonction);
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
