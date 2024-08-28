import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { SiteCtrlService } from 'src/app/_services/site-ctrl.service';
import { Contrat } from 'src/app/models/contrat.model';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Poste } from 'src/app/models/poste.model';
import { CalculService } from 'src/app/services/calcul.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-contrat-avenant',
  templateUrl: './contrat-avenant.component.html',
  styleUrls: ['./contrat-avenant.component.scss']
})
export class ContratAvenantComponent implements OnInit {

  enCoursSuppression = false;

  code = "";

  contrat = new Contrat();
  avenants = new Array<any>();
  processing = true;

  nbVigileNuit = 0;
  nbVigileJour = 0;
  nbPostes = 0;
  description = '';
  postes = new Array<Poste>();

  contratsHistoriques = new Array<Contrat>();
  historiquesSuprrimees = new Array<number>();
  sitesSuprrimees = new Array<number>();

  montrerErreurs = false;

  erreurs = {
    libelle: false,
    dateDebut: false,
    dateFin: false,
    dateSignature: false,
    nom: false,
    tel: false,
    adresse: false,
    representant: false,
    nbPostes: false,
    nbJourNegatif: false,
    nbNuitNegatif: false,
    nbVigiles: false,
  }
  contratsites = new Array<ContratSite>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private contratService: JarvisService<Contrat>,
    private siteService: JarvisService<ContratSite>,
    private siteCtrlService: SiteCtrlService,
    private contratCtrlService: ContratCtrlService,
    private posteCtrlService: PosteCtrlService,
    private calculService: CalculService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getContrat(id).then((contrat) => {
          console.log('contrat');
          console.log(contrat);
          this.contrat = contrat;
          this.contrat.dateDebut = new Date();

          this.nbVigileNuit = contrat.nbVigileNuit + 0;
          this.nbVigileJour = contrat.nbVigileJour + 0;
          this.nbPostes = contrat.nbPostes + 0;
          this.description = contrat.description + '';
          this.getHistoriqueDesContrats();

        });
      }
    });
  }

  getContrat(id: string): Promise<Contrat> {
    return new Promise((resolve, reject) => {
      this.contratService.get('contrat', Number(id)).then((contrat) => {
        resolve(contrat);
      });
    });
  }

  isFormulaireValide(): boolean {
    let resultat = true;
    this.montrerErreurs = true;
    this.erreurs.libelle = false;
    this.erreurs.dateDebut = false;
    this.erreurs.nom = false;
    this.erreurs.tel = false;
    this.erreurs.adresse = false;
    this.erreurs.representant = false;
    this.erreurs.nbPostes = false;
    this.erreurs.nbJourNegatif = false;
    this.erreurs.nbNuitNegatif = false;
    this.erreurs.nbVigiles = false;

    this.erreurs.libelle = !this.contrat.libelle;
    this.erreurs.dateDebut = !this.contrat.dateDebut;
    this.erreurs.nom = !this.contrat.nom;
    this.erreurs.tel = !this.isTel(this.contrat.tel);
    this.erreurs.adresse = !this.contrat.adresse;
    this.erreurs.representant = !this.contrat.particulier && !this.contrat.representant;
    this.erreurs.nbPostes = !this.contrat.nbPostes || (!!this.contrat.nbPostes && this.contrat.nbPostes < 0);
    this.erreurs.nbJourNegatif = (!!this.contrat.nbVigileJour && this.contrat.nbVigileJour < 0);
    this.erreurs.nbNuitNegatif = (!!this.contrat.nbVigileNuit && this.contrat.nbVigileNuit < 0);
    this.erreurs.nbVigiles = this.contrat.nbVigileNuit + this.contrat.nbVigileJour < 1;

    resultat = !this.erreurs.libelle && !this.erreurs.dateDebut && !this.erreurs.nom && !this.erreurs.tel && !this.erreurs.adresse && !this.erreurs.representant;
    resultat = resultat && !this.erreurs.nbPostes && !this.erreurs.nbJourNegatif && !this.erreurs.nbNuitNegatif && !this.erreurs.nbVigiles
    return resultat;
  }

  save() {
    console.log(this.contrat);
    if (!this.isFormulaireValide()) {
      return
    }
    console.log('contrat à enregistrer');
    console.log(this.contrat);
    console.log(this.contrat);
    this.contrat.noms = this.contrat.nom + ' ' + this.contrat.prenom

    if (this.contrat.dateDebut)
      this.contrat.dateDebut = new Date(this.contrat.dateDebut);

    if (this.contrat.dateFin)
      this.contrat.dateFin = new Date(this.contrat.dateFin);

    if (this.contrat.dateSignature)
      this.contrat.dateSignature = new Date(this.contrat.dateSignature);

    if (this.contrat.dateSignature && this.contrat.dateDebut) {
      if (this.contrat.dateSignature.getTime() > this.contrat.dateDebut.getTime()) {
        this.montrerErreurs = true;
        this.erreurs.dateDebut = true;
        this.erreurs.dateSignature = true;
        return;
      }
    }

    if (this.contrat.dateDebut && this.contrat.dateFin) {
      if (this.contrat.dateDebut.getTime() > this.contrat.dateFin.getTime()) {
        this.montrerErreurs = true;
        this.erreurs.dateDebut = true;
        this.erreurs.dateFin = true;
        return;
      }
    }

    if (this.contrat.idcontrat == 0) {
      this.creerNouveauContrat(this.contrat);
    } else {
      this.modifier();
    }
  }

  creerNouveauContrat(contrat: Contrat) {
    this.contratService.ajouter('contrat', contrat).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Ajout effectué avec succès");
      this.contratService.getAll('contrat').then((contrats) => {
        const c = contrats.sort((a, b) => {
          return a.idcontrat - b.idcontrat > 0 ? -1 : 1;
        })[0];
        this.router.navigate(['contrat', 'view', c.idcontrat]);
      });
    }).catch((e) => {
      this.processing = false;
    });
  }

  ajouter(contrat: Contrat) {
    this.contratService.ajouter('contrat', contrat).then(() => {
      this.router.navigate(['contrat', 'view', this.contrat.idcontrat]);
    }).catch((e) => {
    });
  }

  modifier() {
    // Si les terme du contrat n'ont pas chzangé
    if (this.isMemesTermesDuContrat()) {
      this.contrat.date = new Date();
      this.contratService.modifier('contrat', this.contrat.idcontrat, this.contrat).then(() => {
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['contrat', 'view', this.contrat.idcontrat]);
      }).catch((e) => {
      });
    } else {
      // Si les termes du contrat ont changé
      // Date de modifcation du contrat
      const date = new Date(this.contrat.date);

      this.contrat.date = new Date();
      console.log('Le contrat avant d^tre enregistré');
      console.log(this.contrat.date);
      console.log(this.contrat.nbPostes);
      this.contratService.modifier('contrat', this.contrat.idcontrat, this.contrat).then(() => {
        console.log('Le contrat a bien été enregistré');
        console.log(this.contrat.date);
        console.log(this.contrat.nbPostes);
        this.createFils(date).then(() => {
          this.notifierService.notify('success', "Modification effectuée avec succès");
          this.router.navigate(['contrat', 'view', this.contrat.idcontrat]);
        });
      }).catch((e) => {
      });
    }
  }

  isMemesTermesDuContrat() {
    return this.contrat.nbPostes === this.nbPostes &&
      this.contrat.nbVigileJour === this.nbVigileJour &&
      this.contrat.description === this.description &&
      this.contrat.nbVigileNuit === this.nbVigileNuit;
  }

  createFils(date: Date) {
    console.log('Le contrat avant de créer le fils');
    console.log(this.contrat.date);
    console.log(this.contrat.nbPostes);
    console.log(date);
    return new Promise((resolve, reject) => {
      const fils = JSON.parse(JSON.stringify(this.contrat));
      fils.idparent = null;
      fils.nbPostes = this.nbPostes;
      fils.nbVigileJour = this.nbVigileJour;
      fils.description = this.description;
      fils.nbVigileNuit = this.nbVigileNuit;
      fils.date = date;
      this.contratCtrlService.saveContratEtFils(this.contrat.idcontrat, fils).then(() => {
        resolve(fils);
      });
    });
  }

  async supprimer() {
    this.enCoursSuppression = true;
    this.contratsites = [];
    console.log("Récupération des sites");
    this.contratsites = await this.getSites();
    this.postes = await this.getPostes();
    console.log("contratsites.length");
    console.log(this.contratsites.length);
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.posteCtrlService.getPostesOfContrat(this.contrat).then((postes) => {
        resolve(postes);
      });
    });
  }

  isContratSupprimee(id: number): boolean {
    let resultat = false;
    this.historiquesSuprrimees.forEach((idcontrat) => {
      if (id === idcontrat) {
        resultat = true;
      }
    });
    return resultat;
  }

  isSiteSupprimee(id: number): boolean {
    let resultat = false;
    this.sitesSuprrimees.forEach((idcontrat) => {
      if (id === idcontrat) {
        resultat = true;
      }
    });
    return resultat;
  }

  isTel(numero: string): boolean {
    return this.calculService.isTel(numero);
  }

  async supprimerDefinitivement() {
    if (this.code != "1234") {
      return;
    }
    this.enCoursSuppression = true;
    let message = "Etes-vous sûr de vouloir supprimer cet élément ?";
    message += " Tous les sites seront supprimés";
    const reponse = confirm(message);
    if (reponse) {
      for (let index = 0; index < this.contratsHistoriques.length; index++) {
        const historique = this.contratsHistoriques[index];
        if (historique.idcontrat !== this.contrat.idcontrat) {
          await this.contratService.supprimer('contrat', historique.idcontrat);
          this.historiquesSuprrimees.push(historique.idcontrat);
        }
      }
      this.contratService.supprimer('contrat', this.contrat.idcontrat).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['contrat']);
      }).catch((e) => {
        this.processing = false;
        this.notifierService.notify('error', "Impossible de supprimer cet élément car il est lié à d'autres éléments dans le système");
      });

    }
  }

  getSites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.siteCtrlService.getSitesOfContrat(this.contrat).then((contratsites) => {
        console.log('contratsites');
        console.log(contratsites);
        contratsites = contratsites.filter((contratsite) => {
          return (contratsite.idcontrat.idcontrat === this.contrat.idcontrat)
        });
        resolve(contratsites);
      });
    });
  }

  private getHistoriqueDesContrats() {
    if (this.contrat.idcontrat !== 0) {
      console.log("getHistoriqueDesContrats".toLocaleUpperCase());
      this.contratsHistoriques = [];
      this.contratCtrlService.getHistoriqueDesContrats(this.contrat).then((contrats) => {
        this.contratsHistoriques = contrats;
      });
    }
  }
  supprimerSite(site: ContratSite) {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.siteService.supprimer('contratsite', site.idcontratSite).then((data) => {
        console.log('data');
        console.log(data);
        this.notifierService.notify('success', "Suppression du site effectuée avec succès");
        // window.location.reload();
      }).catch((e) => {
        this.notifierService.notify('error', "Impossible de supprimer cet élément car il est lié à d'autres éléments dans le système");
      });
    }
  }

  choisirClient(choix: number) {
    setTimeout(() => {
      if (choix === 0) {
        this.contrat.particulier = true;
      } else {
        this.contrat.particulier = false;
      }
    }, 250);
  }
}
