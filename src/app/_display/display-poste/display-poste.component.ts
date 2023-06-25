import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { droits } from 'src/app/data/droits';
import { Affectation } from 'src/app/models/affectation.model';
import { ContratSiteVigile } from 'src/app/models/contrat.site.vigile.model';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-display-poste',
  templateUrl: './display-poste.component.html',
  styleUrls: ['./display-poste.component.scss']
})
export class DisplayPosteComponent implements OnInit, OnChanges {

  @Input() poste = new Poste();
  @Input() postesVigiles?= new Array<PosteVigile>();
  @Input() affectations = new Array<Affectation>();

  @Output() isNotVacant = new EventEmitter<boolean>();

  myPostesVigiles = new Array<PosteVigile>();
  nbJour = 0;
  nbNuit = 0;
  exigences = new Array<ContratSiteVigile>();
  notVacant = false;

  exigencesVerifiees = false;
  nombre = 0;
  engages = 0;

  constructor(
    private contratSiteVigileService: JarvisService<ContratSiteVigile>,
    private router: Router,
    private affectationCtrlService: AffectationCtrlService,
    private contratCtrlService: ContratCtrlService,
  ) { }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigate(['poste', 'view', this.poste.idposte]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getExigences();
  }

  getExigences(): void {
    this.affectationCtrlService.getAffectationsOfPoste(this.poste).then((affectations) => {
      this.affectations = affectations;
      this.nombre = 0;
      this.contratCtrlService.getExigencesDuSite(this.poste.idcontratsite!).then((exigences) => {
        this.exigences = exigences.filter((exigence) => {
          return exigence.horaire == this.poste.horaire;
        });
        exigences.forEach((exigence) => {
          if (exigence.horaire == this.poste.horaire) this.nombre += exigence.quantite;
        });
        this.exigencesVerifiees = this.verifierToutesLesExigences();
      });
    });

  }

  verifierExigence(exigence: ContratSiteVigile): boolean {
    return exigence.quantite == this.affectations.length;
  }

  verifierToutesLesExigences(): boolean {
    let resultat = 0;
    this.exigences.forEach((exigence) => {
      resultat += exigence.quantite;
    });
    return resultat === this.affectations.length;
  }
}
