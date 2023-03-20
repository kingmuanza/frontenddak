import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Client } from 'src/app/models/client.model';
import { Contrat } from 'src/app/models/contrat.model';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-contrat-edit',
  templateUrl: './contrat-edit.component.html',
  styleUrls: ['./contrat-edit.component.scss']
})
export class ContratEditComponent implements OnInit {

  enCoursSuppression = true;

  contrat = new Contrat();
  avenants = new Array<any>();
  processing = true;

  nbVigileNuit = 0;
  nbVigileJour = 0;
  nbPostes = 0;
  description = '';

  contrats = new Array<Contrat>();

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
  contratsites= new Array<ContratSite>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private contratService: JarvisService<Contrat>,
    private clientService: JarvisService<Client>,
    private siteService: JarvisService<ContratSite>,
    private avenantService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getContrat(id).then((contrat) => {
          console.log('contrat');
          console.log(contrat);
          this.contrat = contrat;

          this.nbVigileNuit = contrat.nbVigileNuit + 0;
          this.nbVigileJour = contrat.nbVigileJour + 0;
          this.nbPostes = contrat.nbPostes + 0;
          this.description = contrat.description + '';

          this.contratService.getAll('contrat').then((data) => {
            console.log('data');
            console.log(data);
            this.contrats = data.filter((contrat) => {
              return contrat.idparent && contrat.idparent.idcontrat === this.contrat.idcontrat;
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

  getAvenants(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.avenantService.getAll('contratavenant').then((avenants) => {
        console.log('avenants');
        console.log(avenants);
        resolve(avenants);
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
    this.erreurs.tel = !this.contrat.tel;
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
    this.contratService.ajouter('contrat', contrat).then((data) => {
      console.log('data');
      console.log(data);
      // this.notifierService.notify('success', "Ajout effectué avec succès");
      this.router.navigate(['contrat', 'view', this.contrat.idcontrat]);
    }).catch((e) => {
    });
  }

  modifier() {
    // Si les terme du contrat n'o nt pas chzangé
    if (
      this.contrat.nbPostes === this.nbPostes &&
      this.contrat.nbVigileJour === this.nbVigileJour &&
      this.contrat.description === this.description &&
      this.contrat.nbVigileNuit === this.nbVigileNuit
    ) {
      this.contratService.modifier('contrat', this.contrat.idcontrat, this.contrat).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['contrat', 'view', this.contrat.idcontrat]);
      }).catch((e) => {
        this.processing = false;
      });
    } else
    // Si les termes du contrat ont changé
    {
      // Date de modifcation du contrat
      const date = new Date(this.contrat.date);
      this.contrat.date = new Date();

      this.contratService.modifier('contrat', this.contrat.idcontrat, this.contrat).then((data) => {
        console.log('data');
        console.log(data);
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.createFils(date);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  createFils(date: Date) {
    const fils = JSON.parse(JSON.stringify(this.contrat));
    fils.idparent = this.contrat;
    fils.nbPostes = this.nbPostes;
    fils.nbVigileJour = this.nbVigileJour;
    fils.description = this.description;
    fils.nbVigileNuit = this.nbVigileNuit;
    fils.date = date;
    console.log('fils');
    console.log(fils);
    this.ajouter(fils);
  }

  async supprimer() {
    this.enCoursSuppression = true;
    let message = "Etes-vous sûr de vouloir supprimer cet élément ?";
    message += " Tous les sites seront supprimés";
    const reponse = confirm(message);
    if (reponse) {      
      this.contratsites = await this.getSites();
      console.log("contratsites.length");
      console.log(this.contratsites.length);
      this.processing = true;
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
      this.siteService.getAll('contratsite').then((contratsites) => {
        console.log('contratsites');
        console.log(contratsites);
        contratsites = contratsites.filter((contratsite) => {
          return (contratsite.idcontrat.idcontrat === this.contrat.idcontrat)
        });
        resolve(contratsites);
      });
    });
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
