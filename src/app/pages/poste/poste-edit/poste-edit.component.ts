import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { PointageService } from 'src/app/services/pointage.service';
import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Contrat } from 'src/app/models/contrat.model';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Quartier } from 'src/app/models/quartier.model';

@Component({
  selector: 'app-poste-edit',
  templateUrl: './poste-edit.component.html',
  styleUrls: ['./poste-edit.component.scss']
})
export class PosteEditComponent implements OnInit {

  app: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  poste = new Poste();
  processing = false;
  zones = new Array<any>();
  quartiers = new Array<Quartier>();
  affectations = new Array<any>();
  affVigilesJour = 0;
  affVigilesNuit = 0;

  contrats = new Array<Contrat>();
  contratsites = new Array<ContratSite>();

  erreurContrat = false;
  isPosteContractuel = true;

  contrat = new Contrat();
  siteChoisi = new ContratSite();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private pointageService: PointageService,
    private jarvisService: JarvisService<any>,
    private posteService: JarvisService<Poste>,
    private quartierService: JarvisService<Quartier>,
    private siteService: JarvisService<ContratSite>,
    private contratService: JarvisService<Contrat>
  ) {

    this.app = initializeApp(FIREBASECONFIG);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[0, 'desc']]
    };


    this.getContrats().then((contrats) => {
      this.contrats = contrats.filter((contrat) => {
        return !contrat.idparent;
      });
      this.getVilles().then((zones) => {
        this.zones = zones;
        this.getNationalites().then((quartiers) => {
          this.quartiers = quartiers;
          this.route.paramMap.subscribe((paramMap) => {
            const id = paramMap.get('id');
            if (id) {

              this.posteService.get('poste', Number(id)).then((poste) => {
                console.log('le poste recupéré');
                console.log(poste);
                this.poste = poste;
                /* 
                                this.contrats.forEach((contrat) => {
                                  if (this.poste.idcontrat && this.poste.idcontrat.idcontrat === contrat.idcontrat) {
                                    this.poste.idcontrat = contrat;
                                  }
                                });
                 */
                this.pointageService.getRemotePoste(id).then((posteRemote) => {
                  console.log('posteRemote');
                  console.log(posteRemote);

                  if (posteRemote) {
                    if (posteRemote.latitude) {
                      this.poste.latitude = posteRemote.latitude
                    }
                    if (posteRemote.longitude) {
                      this.poste.longitude = posteRemote.longitude
                    }
                  }
                });

                this.jarvisService.getAll('affectation').then((data) => {
                  console.log('data');
                  console.log(data);
                  data.forEach((affectation) => {
                    if (affectation.idposte.idposte === poste.idposte) {
                      this.affectations.push(affectation);
                    }
                  });
                  this.affVigilesJour = 0;
                  this.affVigilesNuit = 0;
                  this.affectations.forEach((aff) => {
                    if (!aff.arret) {
                      let horaire: string;
                      horaire = aff.horaire;
                      if (horaire.toLocaleLowerCase() == 'jour') {
                        this.affVigilesJour += 1;
                      }
                      if (horaire.toLocaleLowerCase() == 'nuit') {
                        this.affVigilesNuit += 1;
                      }
                    }
                  });
                  this.dtTrigger.next('');
                });

                zones.forEach((zone) => {
                  if (this.poste.zone && zone.idzone == this.poste.zone.idzone) {
                    this.poste.zone = zone;
                  }
                });
                quartiers.forEach((quartier) => {
                  if (this.poste.idquartier && quartier.idquartier == this.poste.idquartier.idquartier) {
                    this.poste.idquartier = quartier;
                  }
                });
              });
            } else {
              this.quartierService.getAll('quartier').then((quartiers) => {
                this.quartiers = quartiers;
              });
            }
          });
        });
      });
    });
  }

  getVilles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('zone').then((zones) => {
        console.log('zones');
        console.log(zones);
        resolve(zones);
      });
    });
  }

  getNationalites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('quartier').then((quartiers) => {
        console.log('quartiers');
        console.log(quartiers);
        resolve(quartiers);
      });
    });
  }

  save() {
    console.log('poste à enregistrer');
    console.log(this.poste);
    if (this.poste.debutContrat)
      this.poste.debutContrat = new Date(this.poste.debutContrat);

    if (this.poste.finContrat)
      this.poste.finContrat = new Date(this.poste.finContrat);

    if (this.poste.idposte == 0) {
      if (this.poste.code && this.poste.libelle) {
        this.processing = true;
        this.posteService.ajouter('poste', this.poste).then((data) => {
          console.log('data');
          console.log(data);
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['poste']);
          this.posteService.getAll('poste').then((postes) => {
            const c = postes.sort((a, b) => {
              return a.idposte - b.idposte > 0 ? -1 : 1;
            })[0];
            this.router.navigate(['poste', 'view', c.idposte]);
          });
        }).catch((e) => {
          this.processing = false;
        });
      } else {
        this.notifierService.notify('error', "Veuillez renseigner un code et un libellé");
      }
    } else {
      this.processing = true;
      this.jarvisService.modifier('poste', this.poste.idposte, this.poste).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['poste', 'view', this.poste.idposte]);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('poste', this.poste.idposte).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['poste']);
      });
    }
  }

  edit(id: string) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  voirContrat(id: string | number) {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;

    window.open('/#/contrat/view/' + id, 'Contrat', params);
    // this.router.navigate(['contrat', 'view', id]);
  }
  jourSemaine(jour: number) {
    if (jour == 1)
      return "Lundi";
    if (jour == 2)
      return "Mardi";
    if (jour == 3)
      return "Mercredi";
    if (jour == 4)
      return "Jeudi";
    if (jour == 5)
      return "Vendredi";
    if (jour == 6)
      return "Samedi";
    if (jour == 7)
      return "Dimanche";

    return "" + jour ? jour : "";
  }

  getContrats(): Promise<Array<Contrat>> {
    return new Promise((resolve, reject) => {
      this.contratService.getAll('contrat').then((contrats) => {
        console.log('contrats');
        console.log(contrats);
        resolve(contrats);
      });
    });
  }

  getPosteFirebase() {
    this.pointageService.getRemotePoste(this.poste.idposte + '').then((data) => {
      this.poste.latitude = data.latitude;
      this.poste.longitude = data.longitude;
    });
  }

  checkContrat(event: any) {
    console.log('event');
    console.log(event);
  }

  getSitesOfContrat(contrat?: Contrat) {
    setTimeout(() => {
      console.log('getSitesOfContrat');
      console.log(contrat?.libelle);
      if (contrat) {
        this.siteService.getAllSilent('contratsite').then((contratsites) => {
          console.log('contratsites');
          this.contratsites = contratsites.filter((contratsite) => {
            return contratsite.idcontrat.idcontrat === contrat.idcontrat;
          });
          console.log(this.contratsites);
        });
      }
    }, 500);
  }

  sinspirerDuSite(site: ContratSite) {
    this.siteChoisi = site;
    console.log('site');
    console.log(site);
    this.poste.libelle = site.nom;
    this.poste.description = site.description;
    this.poste.contact = site.personne;
    this.poste.tel = site.tel;
    this.poste.idcontratsite = site;
    this.quartiers.forEach((quartier) => {
      if (quartier.idquartier === site.idquartier?.idquartier) {
        this.poste.idquartier = quartier;
      }
    })
  }
}
