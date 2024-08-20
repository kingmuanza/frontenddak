import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { Location } from '@angular/common';
import { Vigile } from 'src/app/models/vigile.model';
import { VigileService } from 'src/app/services/vigile.service';
import { Poste } from 'src/app/models/poste.model';
import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';

@Component({
  selector: 'app-affectation-view',
  templateUrl: './affectation-view.component.html',
  styleUrls: ['./affectation-view.component.scss']
})
export class AffectationViewComponent implements OnInit {

  affectation = new Affectation();
  date = new Date();
  remplacant = new Vigile();
  vigile = new Vigile();
  vigiles = new Array<Vigile>();
  remplacants = new Array<Vigile>();
  rechercheVigile = "";
  rechercheRemplacant = "";
  jourRepos = "";

  arret = undefined;
  affectationActuelle: Affectation | undefined

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private affectationService: JarvisService<Affectation>,
    private affectationCtrlService: AffectationCtrlService,
    private jarvisService: JarvisService<Vigile>,
    private posteService: JarvisService<Poste>,
    private vigileService: VigileService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.affectationService.get('affectation', Number(id)).then((affectation) => {
          console.log('le affectation recupéré');
          console.log(affectation);
          this.affectation = affectation;
          this.jourRepos = affectation.jourRepos;
          this.date = this.affectation.dateAffectation;
          this.vigile = this.affectation.idvigile;
          this.remplacant = this.affectation.remplacant;
          this.remplacants = [this.remplacant];
          this.vigiles = [this.vigile];
        });
      } else {
        this.affectation.dateAffectation = new Date().toISOString().split('T')[0];
      }
    });
  }

  arreter() {
    console.log(this.affectation);
    if (this.arret) {
      this.affectation.arret = new Date(this.arret);
      this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
        this.notifierService.notify('success', "Affectation mise en arrêt avec succès");
        this.router.navigate(['affectation']);
      });
    }
  }

  async relancer() {
    console.log(this.affectation);
    let oui = confirm("Etes-vous sur de vouloir relancer cette affectation ?");
    if (oui) {
      let aff = await this.affectationCtrlService.getAffectationOfVigile(this.affectation.idvigile);
      console.log("affectation precedente");
      console.log(aff);
      if (aff && Object.keys(aff).length) {
        this.notifierService.notify('error', "Le vigile a dejà une autre affectation en cours au poste " + aff.idposte.libelle);
      } else {
        this.affectation.arret = null;
        await this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation);
        this.notifierService.notify('success', "Affectation relancée avec succès");
        this.router.navigate(['affectation']);
      }
    }
  }

  modifierDate() {
    this.affectation.dateAffectation = new Date(this.date);
    this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
      this.notifierService.notify('success', "Date de l'affectation mise à jour avec succès");
      this.retour();
    });
  }

  getAffectionOfVigile(vigile: Vigile): Promise<Affectation | undefined> {
    return new Promise((resolve, reject) => {
      this.affectationCtrlService.getAffectationOfVigile(vigile).then((data) => {
        console.log('data');
        console.log(data);
        this.affectationActuelle = data;
      });
    });
  }

  async modifierVigile() {
    let ancienneAffectation = this.dupliquer(this.affectation);
    await this.affectationService.ajouter('affectation', ancienneAffectation);
    this.notifierService.notify('success', "Création d'une nouvelle affectation");

    this.affectation.idvigile = this.vigile;
    this.affectation.dateAffectation = new Date();

    if (this.affectationActuelle && this.affectationActuelle.idposte) {
      this.affectationActuelle.arret = new Date();
      await this.affectationService.modifier('affectation', this.affectationActuelle.idaffectation, this.affectationActuelle);
      this.notifierService.notify('success', "Affectation au poste " + this.affectationActuelle.idposte.libelle + " mise à l'arrêt");
    }
    await this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation);
    this.notifierService.notify('success', "Vigile mis à jour avec succès");
    this.retour();
  }

  async modifierRemplacant() {
    let ancienneAffectation = this.dupliquer(this.affectation);
    await this.affectationService.ajouter('affectation', ancienneAffectation);
    this.notifierService.notify('success', "Création d'une nouvelle affectation");

    this.affectation.remplacant = this.remplacant;
    this.affectation.dateAffectation = new Date();

    await this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation);
    this.notifierService.notify('success', "Remplacant mis à jour avec succès");
    this.retour();
  }

  async modifierJourDeRepos() {
    let oui = confirm("Les jours de repos du vigile et du poste seront aussi mis à jour. Voulez-vous continuer ? ");
    if (oui) {

      this.affectation.jourRepos = this.jourRepos;
      await this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation);

      this.affectation.idvigile.jourRepos = Number(this.jourRepos);
      await this.jarvisService.modifier('vigile', this.affectation.idvigile.idvigile, this.affectation.idvigile);

      this.affectation.idposte.jourRepos = Number(this.jourRepos) + "";
      await this.posteService.modifier('poste', this.affectation.idposte.idposte, this.affectation.idposte);

      this.notifierService.notify('success', "Jour de repos mis à jour avec succès");
      this.retour();
    }
  }

  getVigiles(texte: string) {
    if (texte.length > 4)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.vigiles = vigiles;
      });
  }

  getRemplacants(texte: string) {
    if (texte.length > 4)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.remplacants = vigiles;
      });
  }

  jourSemaine(jour: number | string) {
    return this.affectationService.jourSemaine(Number(jour))
  }

  retour() {
    this._location.back();
  }

  dupliquer(affectation: Affectation): Affectation {
    let aff: Affectation = JSON.parse(JSON.stringify(affectation));
    aff.idaffectation = 0;
    aff.arret = new Date();
    return aff;
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cette affactation ?");
    if (reponse) {
      this.affectationService.supprimer('affectation', this.affectation.idaffectation).then((data) => {
        console.log('data');
        console.log(data);
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['zone']);
      });
    }
  }

  isVigileDisabled(vigile: Vigile): boolean {
    return !(!vigile.horaire || vigile.horaire.toLowerCase().trim().indexOf(this.affectation.idposte.horaire.toLowerCase().trim()) != -1);
  }

  getVigileHoraire(vigile: Vigile): string {
    return !(!vigile.horaire || vigile.horaire.toLowerCase().trim().indexOf(this.affectation.idposte.horaire.toLowerCase().trim()) != -1)
      ? vigile.horaire.toUpperCase()
      : '';
  }


}
