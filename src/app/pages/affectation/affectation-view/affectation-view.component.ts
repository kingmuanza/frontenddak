import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { Location } from '@angular/common';
import { Vigile } from 'src/app/models/vigile.model';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-affectation-view',
  templateUrl: './affectation-view.component.html',
  styleUrls: ['./affectation-view.component.scss']
})
export class AffectationViewComponent implements OnInit {

  affectation = new Affectation();
  date = new Date();
  remplacant = new Vigile();
  vigiles = new Array<Vigile>();
  rechercheVigile = "";
  jourRepos = "";

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private affectationService: JarvisService<Affectation>,
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
          this.remplacant = this.affectation.remplacant;
          this.vigiles = [this.remplacant];
        });
      } else {
        this.affectation.dateAffectation = new Date().toISOString().split('T')[0];
      }
    });
  }

  arreter() {
    console.log(this.affectation);
    this.affectation.arret = new Date(this.affectation.arret);
    this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
      this.notifierService.notify('success', "Affectation mise en arrêt avec succès");
      this.router.navigate(['affectation']);
    });
  }

  modifierDate() {
    this.affectation.dateAffectation = new Date(this.date);
    this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
      this.notifierService.notify('success', "Date de l'affectation mise à jour avec succès");
      this.retour();
    });
  }

  modifierRemplacant() {
    this.affectation.remplacant = this.remplacant,
      this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
        this.notifierService.notify('success', "Remplacant mis à jour avec succès");
        this.retour();
      });
  }

  modifierJourDeRepos() {
    this.affectation.jourRepos = this.jourRepos,
      this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
        this.notifierService.notify('success', "Remplacant mis à jour avec succès");
        this.retour();
      });
  }

  getVigiles(texte: string) {
    if (texte.length > 4)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.vigiles = vigiles;
      });
  }

  jourSemaine(jour: number | string) {
    return this.affectationService.jourSemaine(Number(jour))
  }

  retour() {
    this._location.back();
  }

}
