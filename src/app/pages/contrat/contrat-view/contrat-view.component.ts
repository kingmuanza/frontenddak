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

  contrats = new Array<Contrat>();
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratService: JarvisService<Contrat>,
    private affecationService: JarvisService<Affectation>,
    private posteService: JarvisService<Poste>,
    private quartierService: JarvisService<Quartier>,
    private siteService: JarvisService<ContratSite>,
    private notifierService: NotifierService,
    private postevigileService: JarvisService<PosteVigile>,
  ) { }

  ngOnInit(): void {
    this.getDemandesVigiles().then((postesVigiles) => {
      this.postesVigiles = postesVigiles;
    });
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

          this.contratService.getAll('contrat').then((data) => {
            console.log('contrat');
            console.log(data);
            this.contrats = data.filter((contrat) => {
              return contrat.idparent && contrat.idparent.idcontrat === this.contrat.idcontrat;
            });
          });

          this.quartierService.getAll('quartier').then((data) => {
            console.log('quartier');
            console.log(data);
            this.quartiers = data;
          });

          this.getPostes().then((postes) => {
            this.postes = postes;
          });

          this.getSites().then((sites) => {
            this.sites = sites.filter((site) => {
              return site.idcontrat.idcontrat === this.contrat.idcontrat;
            });
          });

        });
      }

    });
  }

  getContrat(id: string): Promise<Contrat> {
    return new Promise((resolve, reject) => {
      this.contratService.get('contrat', Number(id)).then((contrat) => {
        console.log('contrat');
        console.log(contrat);
        resolve(contrat);
      });
    });
  }

  getSites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.siteService.getAll('contratsite').then((contratsites) => {
        console.log('contratsites');
        console.log(contratsites);
        resolve(contratsites);
      });
    });
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.posteService.getAll('poste').then((postes) => {
        postes = postes.filter((poste) => {
          return poste.idcontratsite && poste.idcontratsite.idcontrat.idcontrat === this.contrat.idcontrat;
        });
        resolve(postes);
      });
    });
  }

  getDemandesVigiles(): Promise<Array<PosteVigile>> {
    return new Promise((resolve, reject) => {
      this.postevigileService.getAll('postevigile').then((postevigiles) => {
        console.log('postevigiles');
        console.log(postevigiles);
        resolve(postevigiles);
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

  supprimerSite(site: ContratSite) {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.siteService.supprimer('contratsite', site.idcontratSite).then((data) => {
        console.log('data');
        console.log(data);
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        window.location.reload();
      }).catch((e) => {
        this.notifierService.notify('error', "Impossible de supprimer cet élément car il est lié à d'autres éléments dans le système");
      });
    }
  }

  getData(site: ContratSite, ev: {
    jour: number,
    nuit: number,
  }) {
    // console.log('onVigileCalcul' + site.idcontratSite);
    // console.log(ev);
    this.infosVigiles[site.idcontratSite] = ev;
    console.log(this.infosVigiles);
    this.infosToDataUtiles();
  }

  getDataVacant(poste: Poste, ev: boolean) {
    console.log('getDataVacant' + poste.idposte);
    console.log(ev);
    this.infosVacants[poste.idposte] = ev;
    console.log(this.infosVacants);
    let resultat = this.resulatPostesVacants();
    console.log('resultat');
    console.log(resultat);
  }

  resulatPostesVacants() {
    let resultat = true;
    const keys = Object.keys(this.infosVacants);
    if (keys.length === this.postesJourDansLesExigences + this.postesNuitDansLesExigences) {
      keys.forEach(key => {
        resultat = resultat && this.infosVacants[key];
      });
    } else {
      resultat = false;
    }
    return resultat;
  }

  infosToDataUtiles() {
    // console.log('infosToDataUtiles');
    this.interval = setInterval(() => {
      this.checkStatus();
      const keys = Object.keys(this.infosVacants);
      if (keys.length === this.postesJourDansLesExigences + this.postesNuitDansLesExigences) {
        clearInterval(this.interval);
      }
    }, 1000);
  }


  private checkStatus() {
    this.vigilesJourDansLesExigences = 0;
    this.vigilesNuitDansLesExigences = 0;
    this.postesJourDansLesExigences = 0;
    this.postesNuitDansLesExigences = 0;
    const keys = Object.keys(this.infosVigiles);
    keys.forEach(key => {
      this.vigilesJourDansLesExigences += this.infosVigiles[key].jour;
      this.vigilesNuitDansLesExigences += this.infosVigiles[key].nuit;

      this.postesJourDansLesExigences += this.infosVigiles[key].jour ? 1 : 0;
      this.postesNuitDansLesExigences += this.infosVigiles[key].nuit ? 1 : 0;
    });

    if (this.postes.length === (this.postesJourDansLesExigences + this.postesNuitDansLesExigences)) {
      console.log('1');
      if (this.vigilesJourDansLesExigences === this.contrat.nbVigileJour) {
        console.log('2');
        if (this.vigilesNuitDansLesExigences === this.contrat.nbVigileNuit) {
          console.log('3');
          if (this.sites.length === this.contrat.nbPostes) {
            console.log('4');
            let resultat = this.resulatPostesVacants();
            if (resultat) {
              console.log('5');
              this.contrat.statut = 'PARFAIT';
              this.saveForStatut();
            } else {
              this.contrat.statut = 'CREE';
              this.saveForStatut();
            }
          } else {
            this.contrat.statut = 'CREATION';
            this.saveForStatut();
          }
        } else {
          this.contrat.statut = 'CREATION';
          this.saveForStatut();
        }
      } else {
        this.contrat.statut = 'CREATION';
        this.saveForStatut();
      }
    } else {
      this.contrat.statut = 'CREATION';
      this.saveForStatut();
    }
  }

  private saveForStatut() {
    this.contratService.modifierSilent('contrat', this.contrat.idcontrat, this.contrat).then(() => {
    });
  }


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
