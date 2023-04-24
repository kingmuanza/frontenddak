import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from 'src/app/models/contrat.model';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { NotifierService } from 'angular-notifier';
import { Quartier } from 'src/app/models/quartier.model';
import { Affectation } from 'src/app/models/affectation.model';
import { SiteCtrlService } from 'src/app/_services/site-ctrl.service';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';

@Component({
  selector: 'app-contrat-view',
  templateUrl: './contrat-view.component.html',
  styleUrls: ['./contrat-view.component.scss']
})
export class ContratViewComponent implements OnInit, OnDestroy {

  contrat = new Contrat();
  sites = new Array<ContratSite>();
  postes = new Array<Poste>();
  postesVigiles = new Array<PosteVigile>();
  affectations = new Array<Affectation>();

  quartier = '';

  contratsHistoriques = new Array<Contrat>();
  quartiers = new Array<Quartier>();
  myModal?: bootstrap.Modal;

  site = new ContratSite();

  infosVigiles: any = {};
  infosVacants: any = {};

  vigilesJourDansLesExigences = 0;
  vigilesNuitDansLesExigences = 0;

  postesJourDansLesExigences = 0;
  postesNuitDansLesExigences = 0;

  interval: any;

  montrerErreurs = false;

  erreurs = {
    nom: false,
    quartier: false,
    personne: false,
    tel: false,
    description: false,
  }

  isContratsEnCoursDeCreation = false;

  constructor(
    private route: ActivatedRoute,
    private contratService: JarvisService<Contrat>,
    private affecationService: JarvisService<Affectation>,
    private quartierService: JarvisService<Quartier>,
    private siteService: JarvisService<ContratSite>,
    private notifierService: NotifierService,
    private siteCtrlService: SiteCtrlService,
    private contratCtrlService: ContratCtrlService,
    private posteCtrlService: PosteCtrlService,
  ) { }

  ngOnInit(): void {
    this.affecationService.getAll('affectation').then((data) => {
      console.log('affectations');
      console.log(data);
      this.affectations = data.filter((affectation) => {
        return true;
      });
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getContrat(id).then((contrat) => {
          this.contrat = contrat;

          this.contratCtrlService.isContratsEnCoursDeCreation(contrat).then((isContratsEnCoursDeCreation) => {
            this.isContratsEnCoursDeCreation = isContratsEnCoursDeCreation;
          });

          this.initSite();
          this.quartierService.getAll('quartier').then((data) => {
            this.quartiers = data;
          });

          this.getPostes().then((postes) => {
            this.postes = postes;
          });

          this.getSites().then((sites) => {
            this.sites = sites;
          });

          this.getExigences();

        });
      }

    });
  }

  private initSite() {
    this.site.nom = this.contrat.libelle;
    this.site.personne = this.contrat.noms;
    this.site.tel = this.contrat.tel;
  }

  getContrat(id: string): Promise<Contrat> {
    return new Promise((resolve, reject) => {
      this.contratService.get('contrat', Number(id)).then((contrat) => {
        resolve(contrat);
      });
    });
  }

  getSites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.siteCtrlService.getSitesOfContrat(this.contrat).then((contratsites) => {
        contratsites = contratsites.filter((contratsite) => {
          return (contratsite.idcontrat.idcontrat === this.contrat.idcontrat)
        });
        resolve(contratsites);
      });
    });
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.posteCtrlService.getPostesOfContrat(this.contrat).then((postes) => {
        this.postes = postes;
      });
    });
  }
  getExigences() {
    this.vigilesJourDansLesExigences = 0;
    this.vigilesNuitDansLesExigences = 0;
    this.contratCtrlService.getExigencesDuContrat(this.contrat).then((exigences) => {
      exigences.forEach((exigence) => {
        if (exigence.horaire.toLowerCase() == 'jour') {
          this.vigilesJourDansLesExigences += exigence.quantite;
          this.postesJourDansLesExigences += 1;
        }
        if (exigence.horaire.toLowerCase() == 'nuit') {
          this.vigilesNuitDansLesExigences += exigence.quantite;
          this.postesNuitDansLesExigences += 1;
        }

      });
    });
  }
  openModal() {
    console.log('open modal creation poste');
    const modale = document.getElementById('posteModal');

    console.log(modale);
    if (modale != null) {
      this.myModal = new bootstrap.Modal(modale);
      this.myModal.show();
    }
  }

  async setQuartier(libelle: string) {
    let quartier: Quartier | undefined;

    this.quartiers.forEach((element) => {
      if (element.nom === libelle) {
        quartier = element;
      }
    });
    if (quartier) {
    } else {
      quartier = await this.creerQuartier(libelle);
    }
    return quartier;
  }

  async creerQuartier(libelle: string) {
    if (libelle) {
      const quartier = new Quartier();
      quartier.nom = libelle;
      await this.quartierService.ajouter('quartier', quartier);
      const quartiers = await this.quartierService.getAll('quartier');
      const qwat = quartiers.sort((a, b) => {
        return a.idquartier - b.idquartier > 0 ? -1 : 1;
      })[0];
      return qwat;
    } else {
      return undefined;
    }
  }

  isFormulaireValide(): boolean {
    let resultat = true;

    this.montrerErreurs = true;

    this.erreurs.nom = false;
    this.erreurs.quartier = false;
    this.erreurs.personne = false;
    this.erreurs.tel = false;
    this.erreurs.description = false;

    this.erreurs.nom = !this.site.nom;
    this.erreurs.quartier = !this.quartier;
    this.erreurs.personne = !this.site.personne;
    this.erreurs.tel = !this.site.tel;
    this.erreurs.description = !this.site.description;

    resultat = !this.erreurs.nom && !this.erreurs.quartier && !this.erreurs.personne && !this.erreurs.tel;

    return resultat;
  }

  async saveSite() {

    console.log('saveSite');
    console.log(this.isFormulaireValide());
    if (!this.isFormulaireValide()) {
      return
    }

    console.log('open modal creation poste');
    const modale = document.getElementById('posteModal');

    console.log(modale);
    if (modale != null) {
      this.myModal = new bootstrap.Modal(modale);
      this.myModal.hide();
    }
    console.log('poste à enregistrer');
    console.log(this.site);
    this.site.idcontrat = this.contrat;
    if (this.quartier) {
      this.site.idquartier = await this.setQuartier(this.quartier);
    }

    if (this.site.idcontratSite == 0) {
      if (this.site.nom) {
        this.siteService.ajouter('contratsite', this.site).then((data) => {
          console.log('data');
          console.log(data);
          this.notifierService.notify('success', "Ajout effectué avec succès");
          window.location.reload();
        }).catch((e) => {
        });
      } else {
        this.notifierService.notify('error', "Veuillez renseigner un code et un libellé");
      }
    }
  }

  renommerSite(ev: string) {
    console.log("quartier");
    console.log(ev);
    if (this.site.nom.toLowerCase().indexOf(ev.toLowerCase()) !== -1) {
    } else {
      this.site.nom += " " + ev;

    }
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
