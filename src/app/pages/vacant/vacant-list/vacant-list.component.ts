import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-vacant-list',
  templateUrl: './vacant-list.component.html',
  styleUrls: ['./vacant-list.component.scss']
})
export class VacantListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  postes = new Array<any>();
  vigiles = new Array<Vigile>();
  remplacants = new Array<Vigile>();
  affectations = new Array<Affectation>();
  display = "block";
  horaire = "jour";
  posteConcernee = new Poste();
  processing = false;

  propositions = new Array<{
    vigile: Vigile,
    poste?: Poste,
    remplacant?: Vigile,
  }>();

  constructor(
    private router: Router,
    private affectationService: JarvisService<Affectation>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.posteService.getAll('poste').then((data) => {
      console.log('data');
      console.log(data);
      this.postes = [];
      data.forEach((poste) => {
        if (poste.contrat == 'ENCOURS') {
          this.postes.push(poste);
        }
      });
      this.getAffectations().then(() => {
        this.dtTrigger.next('');
        this.getVigiles().then((vigiles) => {
          this.vigiles = vigiles;
          this.propositions = [];
          this.vigiles.forEach((v) => {
            this.propositions.push({vigile: v})
          });
        });
      });
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      order:[[0, 'desc']] 
    };
  }

  getNombreAffectationJour(poste: Poste): number {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'jour') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations.length;
  }

  getNombreAffectationNuit(poste: Poste): number {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'nuit') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations.length;
  }

  getAffectations(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        this.affectations = data;
        resolve();
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['poste', 'edit', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

  openModal(poste: Poste, horaire: string) {
    this.posteConcernee = poste;
    this.horaire = horaire;
    
    this.vigiles = this.vigiles.sort((v1, v2) => {
      return this.score(v1,poste) - this.score(v2,poste) > 0 ? -1: 1;
    });
    this.propositions = [];
    this.vigiles.forEach((v) => {
      if (v.horaire === horaire) {
        this.propositions.push({vigile: v, poste: this.posteConcernee});
      }
    });
    console.log('open modal');
    const modale = document.getElementById('exampleModal');
    
    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  affecter(p:{
    vigile: Vigile,
    poste?: Poste,
    remplacant?: Vigile,
  }) {
    console.log('close modal');
    console.log(p.vigile.noms);
    console.log(p.remplacant?.noms);
    console.log(p.poste?.libelle);
    const modale = document.getElementById('exampleModal');
    
    console.log(modale);
    if (modale != null) {
      const myModal = bootstrap.Modal.getInstance(modale);
      myModal?.hide();
    }

    const affectation = new Affectation();
    affectation.dateAffectation = new Date();
    affectation.horaire = p.vigile.horaire;
    affectation.remplacant = p.remplacant;
    affectation.idposte = p.poste;
    affectation.idvigile = p.vigile;
    
    this.processing = true;
    this.affectationService.ajouter('affectation', affectation).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Ajout effectué avec succès");
      this.router.navigate(['affectation']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  getVigiles(): Promise<Array<Vigile>> {
    const vigiles = new Array<Vigile>();
    this.remplacants = new Array<Vigile>();
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((data) => {
        console.log('data');
        data.forEach((vigile) => {
          if (!vigile.estRemplacant) {
            if (1 > this.getNombreAffectation(vigile).length) {
              vigiles.push(vigile);
            }
          } else {
            this.remplacants.push(vigile);
          }
        });
        resolve(vigiles);
      });
    });
  }

  getNombreAffectation(vigile: Vigile) {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idvigile.idvigile === vigile.idvigile && !affectation.arret) {
        if (true) {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations;
  }

  score(vigile: Vigile, poste: Poste): number {

    let score = 0;
    if (vigile.zone?.idzone === poste.zone?.idzone) {
      score += 1;
    }
    if (vigile.quartier?.idquartier === poste.idquartier?.idquartier) {
      score += 1;
    }
    return score;
  }


}
