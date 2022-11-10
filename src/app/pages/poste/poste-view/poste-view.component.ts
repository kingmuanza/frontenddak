import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { initializeApp } from 'firebase/app';
import { Subject } from 'rxjs';
import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { Affectation } from 'src/app/models/affectation.model';
import { Equipement } from 'src/app/models/equipement.model';
import { EquipementVigile } from 'src/app/models/equipement.vigile.model';
import { PosteEquipement } from 'src/app/models/poste.equipement.model';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { PointageService } from 'src/app/services/pointage.service';
import * as bootstrap from 'bootstrap';
import { Vigile } from 'src/app/models/vigile.model';
import { ContratSiteVigile } from 'src/app/models/contrat.site.vigile.model';

@Component({
  selector: 'app-poste-view',
  templateUrl: './poste-view.component.html',
  styleUrls: ['./poste-view.component.scss']
})
export class PosteViewComponent implements OnInit {

  app: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  poste = new Poste();
  processing = false;
  zones = new Array<any>();
  quartiers = new Array<any>();
  affectations = new Array<Affectation>();
  vigiles = new Array<Vigile>();
  remplacants = new Array<Vigile>();
  remplacantsDuPoste = new Array<Vigile>();

  vigile: any;

  equipementsvigiles = new Array<EquipementVigile>();
  equipements = new Array<Equipement>();

  postevigile = new PosteVigile();
  postevigiles = new Array<PosteVigile>();

  posteequipement = new PosteEquipement();
  posteequipements = new Array<PosteEquipement>();

  showFormulairePersonnel = false;
  showFormulaireEquipement = false;

  myModal?: bootstrap.Modal;

  exigences = new Array<ContratSiteVigile>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private pointageService: PointageService,
    private jarvisService: JarvisService<any>,
    private affectationService: JarvisService<Affectation>,
    private vigileService: JarvisService<Vigile>,
    private equipementService: JarvisService<Equipement>,
    private equipementVigileService: JarvisService<EquipementVigile>,
    private postevigileService: JarvisService<any>,
    private contratSiteVigileService: JarvisService<ContratSiteVigile>,
    private posteEquipementService: JarvisService<PosteEquipement>,
  ) {

    this.app = initializeApp(FIREBASECONFIG);
  }

  ngOnInit(): void {

    this.getEquipements().then((equipements) => {
      this.equipements = equipements.filter((e) => {
        return true;
      });
    });

    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.jarvisService.get('poste', Number(id)).then((poste) => {
          console.log('le poste recupéré');
          console.log(poste);
          this.poste = poste;

          this.getExigences();

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

          this.poste.debutContrat = poste.debutContrat?.split('T')[0];
          this.poste.finContrat = poste.finContrat?.split('T')[0];

          this.jarvisService.getAll('affectation').then((data) => {
            console.log('data');
            console.log(data);
            data.forEach((affectation) => {
              if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
                this.affectations.push(affectation);
                /**  equipementVigileService */
                this.equipementVigileService.getAll('equipementvigile').then((data) => {
                  this.equipementsvigiles = data.filter((equipementVigile) => {
                    return equipementVigile.idvigile.idvigile === affectation.idvigile.idvigile;
                  }).concat(this.equipementsvigiles);
                });
              }
            });

            this.affectations.forEach((element) => {
              const vigile = element.remplacant;
              const remplacantEstDejaLa = this.remplacantsDuPoste.filter((remplacant) => {
                return remplacant.idvigile === vigile.idvigile;
              });
              if (remplacantEstDejaLa.length > 0) {

              } else {
                this.remplacantsDuPoste.push(vigile);
              }
            });

            this.getDemandesVigiles().then((postevigiles) => {
              this.postevigiles = postevigiles.filter((pv) => {
                return pv.idposte.idposte === this.poste.idposte;
              });
              this.updatePoste();
            });
            this.getDemandesEquipements().then((posteequipements) => {
              this.posteequipements = posteequipements.filter((pv) => {
                return pv.idposte.idposte === this.poste.idposte;
              });
            });

            this.getVigiles().then((vigiles) => {
              this.vigiles = vigiles.filter((v) => {
                return true;
              });
            });

            this.getVigiles().then((vigiles) => {
              this.remplacants = vigiles.filter((v) => {
                return v.estRemplacant;
              });
            });

            this.dtTrigger.next('');

          });

        });
      }
    });
  }

  getExigences(): void {
    this.contratSiteVigileService.getAll('contratsitevigile').then((data) => {
      console.log('contratsitevigile');
      console.log(data);
      this.exigences = data.filter((d) => {
        return this.poste.idcontratsite && d.idcontratsite.idcontratSite === this.poste.idcontratsite.idcontratSite
      });
    });
  }

  private updatePoste() {
    this.poste.bon = true;
    let exigenceVigileJour = 0;
    let exigenceVigileNuit = 0;
    this.postevigiles.forEach((pv) => {
      if (!this.verifierExigenceAgent(pv)) {
        this.poste.bon = false;
      }
      if (pv.horaire === 'jour') {
        exigenceVigileJour += pv.quantite;
      }
      if (pv.horaire === 'nuit') {
        exigenceVigileNuit += pv.quantite;
      }
    });

    this.poste.nombreVigileJour = exigenceVigileJour;
    this.poste.nombreVigileNuit = exigenceVigileNuit;

    this.jarvisService.modifier('poste', this.poste.idposte, this.poste).then((data) => { });
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

  getDemandesEquipements(): Promise<Array<PosteEquipement>> {
    return new Promise((resolve, reject) => {
      this.posteEquipementService.getAll('posteequipement').then((posteequipements) => {
        console.log('posteequipements');
        console.log(posteequipements);
        resolve(posteequipements);
      });
    });
  }

  getEquipements(): Promise<Array<Equipement>> {
    return new Promise((resolve, reject) => {
      this.equipementService.getAll('equipement').then((equipements) => {
        console.log('equipements');
        console.log(equipements);
        resolve(equipements);
      });
    });
  }

  getVigiles(): Promise<Array<Vigile>> {
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((vigiles) => {
        console.log('vigiles');
        console.log(vigiles);
        resolve(vigiles);
      });
    });
  }

  isVigileVerifieExigence(vigile: Vigile, exigence: PosteVigile): boolean {
    let resultat = false;
    const isNotRemplacant = !vigile.estRemplacant && !vigile.estRemplacantConge;
    const isBonneHoraire = !(!vigile.horaire) && vigile.horaire === exigence.horaire;
    const isAgent = !(!vigile.fonction) && vigile.fonction === exigence.typeVigile;

    resultat = isNotRemplacant && isBonneHoraire && isAgent;
    return resultat;
  }

  selectionnerVigile(vigile: Vigile) {
    console.log(vigile.idvigile);
    console.log(this.vigile?.idvigile);
    if (this.vigile) {
      this.vigile = null;
    } else {
      this.vigile = JSON.parse(JSON.stringify(vigile));
    }
  }

  affecter(vigile: Vigile, i: number) {
    let remplacantSelect: any;
    remplacantSelect = document.getElementsByName("remplacant" + i)[0];
    const idremplacant = remplacantSelect.value;
    console.log('remplacant');
    console.log(idremplacant);

    if (idremplacant === '0') {
      console.log('Aucun remplacant');
      const affectation = new Affectation();
      affectation.dateAffectation = new Date();
      affectation.horaire = vigile.horaire;
      affectation.idposte = this.poste;
      affectation.idvigile = vigile;
      this.affectationService.ajouter('affectation', affectation).then(() => {
        window.location.reload();
      });
    } else {

      this.vigileService.get('vigile', Number(idremplacant)).then((remplacant) => {
        console.log('remplacant ' + remplacant.noms);
        const affectation = new Affectation();
        affectation.dateAffectation = new Date();
        affectation.horaire = vigile.horaire;
        affectation.idposte = this.poste;
        affectation.idvigile = vigile;
        affectation.remplacant = remplacant;

        this.affectationService.ajouter('affectation', affectation).then(() => {
          window.location.reload();
        });

      });
    }

  }

  save() {
    console.log('poste à enregistrer');
    console.log(this.poste);
    this.poste.libelle = this.poste.code;
    if (this.poste.debutContrat)
      this.poste.debutContrat = new Date(this.poste.debutContrat);

    if (this.poste.finContrat)
      this.poste.finContrat = new Date(this.poste.finContrat);

    if (this.poste.idposte == 0) {
      if (this.poste.code && this.poste.libelle) {
        this.processing = true;
        this.jarvisService.ajouter('poste', this.poste).then((data) => {
          console.log('data');
          console.log(data);
          this.processing = false;
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['poste']);
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
        this.router.navigate(['poste']);
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

  jourSemaine(jour: number) {
    return this.jarvisService.jourSemaine(jour);
  }

  getPosteFirebase() {
    this.pointageService.getRemotePoste(this.poste.idposte + '').then((data) => {
      this.poste.latitude = data.latitude;
      this.poste.longitude = data.longitude;
    });
  }

  verifierExigence(exigence: ContratSiteVigile) {
    let resultat = false;
    let nombre = 0;
    if (exigence) {
      this.affectations.forEach((affectation) => {
        if (affectation.idvigile.fonction === exigence.typeVigile) {
          if (affectation.horaire === exigence.horaire) {
            nombre++;
          }
        }
      });
      return nombre >= exigence.quantite;
    }
    return true;
  }

  verifierExigenceAgent(postevigile: PosteVigile) {
    let resultat = false;
    let nombre = 0;
    if (postevigile) {
      this.affectations.forEach((affectation) => {
        if (affectation.idvigile.fonction === postevigile.typeVigile) {
          if (affectation.horaire === postevigile.horaire) {
            nombre++;
          }
        }
      });
      return nombre >= postevigile.quantite;
    }
    return true;
  }

  verifierExigenceMateriel(posteequipement: PosteEquipement) {
    let nombre = 0;
    this.equipementsvigiles.forEach((ev) => {
      if (ev.idequipement.idequipement === posteequipement.idequipement.idequipement) {
        nombre += ev.quantite;
      }
    });
    return nombre >= posteequipement.quantite;
  }

  ajouterExigencePersonnel() {
    if (this.postevigile.horaire && this.postevigile.quantite && this.postevigile.typeVigile) {
      if (this.postevigile.quantite > 0) {
        this.postevigile.idposte = this.poste;
        this.postevigileService.ajouter('postevigile', this.postevigile).then(() => {
          window.location.reload();
        });
      }
    }
  }

  ajouterExigenceEquipement() {
    if (this.posteequipement.idequipement && this.posteequipement.quantite) {
      if (this.posteequipement.quantite > 0) {
        this.posteequipement.idposte = this.poste;
        this.posteEquipementService.ajouter('posteequipement', this.posteequipement).then(() => {
          window.location.reload();
        });
      }
    }
  }

  supprimerPosteVigile(item: PosteVigile) {
    const oui = confirm('Etes vous sûr de vouloir supprimer cette exigence ?');
    if (oui) {
      this.postevigileService.supprimer('postevigile', item.idposteVigile).then(() => {
        window.location.reload();
      });
    }
  }

  supprimerEquipement(item: PosteEquipement) {
    const oui = confirm('Etes vous sûr de vouloir supprimer cette exigence ?');
    if (oui) {
      this.postevigileService.supprimer('posteequipement', item.idposteEquipement).then(() => {
        window.location.reload();
      });
    }
  }

  openModal() {
    console.log('open modal remplacantconges');
    const modale = document.getElementById('vigilesPropositionsModal');

    console.log(modale);
    if (modale != null) {
      this.myModal = new bootstrap.Modal(modale);
      this.myModal.show();
    }
  }

  score(vigile: Vigile, poste: Poste) {
    return 0;
  }

  getSanctions(vigile: Vigile) {
    return 0;
  }
}
