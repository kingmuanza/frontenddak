import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import * as bootstrap from 'bootstrap';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { droits } from 'src/app/data/droits';
import { Affectation } from 'src/app/models/affectation.model';
import { EquipementVigile } from 'src/app/models/equipement.vigile.model';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Permission } from 'src/app/models/permission.model';
import { Quartier } from 'src/app/models/quartier.model';
import { Suivi } from 'src/app/models/suivi.model';
import { Vigile } from 'src/app/models/vigile.model';
import { Ville } from 'src/app/models/ville.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { ParrainService } from 'src/app/services/parrain.service';

@Component({
  selector: 'app-vigile-view',
  templateUrl: './vigile-view.component.html',
  styleUrls: ['./vigile-view.component.scss']
})
export class VigileViewComponent implements OnInit {

  app: any;

  vigileEnLigne: any;

  // Datatables
  // @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtOptionsPermissions: any = DatatablesOptions;
  dtTriggerPermissions = new Subject<any>();
  dtInstancePermissions!: Promise<DataTables.Api>;

  dtOptionsSanctions: any = DatatablesOptions;
  dtTriggerSanctions = new Subject<any>();

  affectations = new Array<Affectation>();
  affectationsActuelles = new Array<Affectation>();
  quartiers = new Array<Quartier>();

  vigile = new Vigile();
  affectation: Affectation | null = null;
  processing = false;
  villes = new Array<Ville>();
  vigiles = new Array<Vigile>();
  zones = new Array<ZoneDak>();
  nationalites = new Array<Nationalite>();

  url: any;
  parrainSelectionnee = false;

  image = '../../../../assets/img/vigile2.jpg';

  parrains = new Array<Vigile>();
  sanctions = new Array<Suivi>();
  permissions = new Array<Permission>();
  equipements = new Array<EquipementVigile>();

  statut = 'Titulaire';

  mesDroits = droits;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private parrainService: ParrainService,
    private vigileService: JarvisService<Vigile>,
    private affectationService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
    private quartierService: JarvisService<Quartier>,
    private villeService: JarvisService<Ville>,
    private nationaliteService: JarvisService<Nationalite>,
    private sanctionService: JarvisService<Suivi>,
    private permissionService: JarvisService<Permission>,
    private equipementVigileService: JarvisService<EquipementVigile>,
    private authService: AuthService,
  ) {
    this.app = initializeApp(FIREBASECONFIG);
  }

  ngOnInit(): void {
    this.init();

    this.authService.currentUserSubject.subscribe((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur) {
        try {
          this.mesDroits = JSON.parse(utilisateur.droits);
        } catch (error) {
          this.mesDroits = droits;
        }
      }

    });
    this.authService.notifier();
  }


  getRemoteVigile(matricule: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const db = getFirestore(this.app);
      getDoc(doc(db, "vigile", matricule)).then((resultat) => {
        resolve(resultat.data());
      });
    });
  }


  private init() {
    this.getZones().then((zones) => {
      this.zones = zones;
      this.getQuartiers().then((quartiers) => {
        this.quartiers = quartiers;
        this.getVilles().then((villes) => {
          this.villes = villes;
          this.getNationalites().then((nationalites) => {
            this.nationalites = nationalites;
            this.route.paramMap.subscribe((paramMap) => {
              const id = paramMap.get('id');
              if (id) {
                this.initialiserVigile(id, villes, zones, nationalites);
                this.getPermissions().then((permissions) => {
                  this.permissions = permissions;
                  this.dtTriggerPermissions.next('');
                });

              }
            });
          });
        });
      });
    });
  }

  setStatut(vigile: Vigile) {
    if (vigile.estRemplacant) {
      this.statut = 'Remplaçant'
    }
    if (vigile.estRemplacantConge) {
      this.statut = 'Remplaçant Congé'
    }
  }

  getSanctions(): Promise<Array<Suivi>> {
    const resultats = new Array<Suivi>();
    return new Promise((resolve, reject) => {
      this.sanctionService.getAll('suiviposte').then((suivipostes) => {
        console.log('suivipostes');
        console.log(suivipostes);
        suivipostes.forEach((suivi) => {
          if (suivi.idvigile.idvigile === this.vigile.idvigile) {
            resultats.push(suivi)
          }
        });
        resolve(resultats);
      });
    });
  }

  getPermissions(): Promise<Array<Permission>> {
    const resultats = new Array<Permission>();
    return new Promise((resolve, reject) => {
      this.permissionService.getAll('permission').then((permissions) => {
        console.log('permissions');
        console.log(permissions);
        permissions.forEach((permission) => {
          if (permission.idvigile?.idvigile === this.vigile.idvigile) {
            resultats.push(permission)
          }
        });
        resolve(resultats);
      });
    });
  }

  initialiserVigile(id: string, villes: any[], zones: any[], nationalites: any[]) {
    this.vigileService.get('vigile', Number(id)).then((vigile) => {
      console.log('le vigile recupéré');
      console.log(vigile);
      this.vigile = vigile;
      this.setStatut(this.vigile);

      console.log("this.vigile.matricule");
      console.log(this.vigile.matricule);
      this.getRemoteVigile(this.vigile.matricule).then((vigileEnLigne) => {
        this.vigileEnLigne = vigileEnLigne;
        console.log("vigileEnLigne");
        console.log(vigileEnLigne);
        if (vigileEnLigne.photoURL) {
          this.image = vigileEnLigne.photoURL;
        }
      });

      if (!this.vigile.nom) {
        this.vigile.nom = this.vigile.noms;
      }
      if (vigile.image) {
        this.image = this.vigile.image;
      }
      console.log(this.vigile);
      this.getSanctions().then((sanctions) => {
        this.sanctions = sanctions;
        this.dtTriggerSanctions.next("");
      });
      this.getAffectionOfVigile(vigile).then(() => {
        if (vigile.estRemplacant) {
          this.affectationsActuelles = this.getAffectationActuelles();
        } else {
          this.affectation = this.getAffectationActuelle();
        }
      });
      this.initInputsSelect(villes, zones, nationalites);
      this.getVigiles().then((vigiles) => {
        this.vigiles = vigiles;
        this.initParrain(vigile, vigiles);
      });

      this.equipementVigileService.getAll('equipementvigile').then((data) => {
        this.equipements = data.filter((equipementVigile) => {
          return equipementVigile.idvigile.idvigile === this.vigile.idvigile;
        })
      });
    });
  }

  getVigiles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {

      resolve([]);
    });
  }

  async initParrain(vigile: Vigile, vigiles: Array<Vigile>) {
    this.parrains = await this.parrainService.initParrain(vigile, vigiles);
    this.parrainSelectionnee = true;
  }

  initInputsSelect(villes: any[], zones: any[], nationalites: any[]) {
    villes.forEach((ville) => {
      if (this.vigile.ville && ville.idville == this.vigile.ville.idville) {
        this.vigile.ville = ville;
      }
    });

    zones.forEach((zone) => {
      if (this.vigile.zone && zone.idzone == this.vigile.zone.idzone) {
        this.vigile.zone = zone;
      }
    });

    nationalites.forEach((nationalite) => {
      if (this.vigile.nationalite && nationalite.idnationalite == this.vigile.nationalite.idnationalite) {
        this.vigile.nationalite = nationalite;
      }
    });
  }

  getAffectionOfVigile(vigile: Vigile): Promise<void> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        data.forEach((affectation) => {
          if (vigile.estRemplacant) {
            if (affectation.remplacant && affectation.remplacant.idvigile === vigile.idvigile) {
              this.affectations.push(affectation);
            }
          } else {
            if (affectation.idvigile.idvigile === vigile.idvigile) {
              this.affectations.push(affectation);
            }
          }
        });
        resolve();
      });
    });
  }

  getAffectationActuelle() {
    let affectation: Affectation | null;
    affectation = null;
    this.affectations.forEach((aff) => {
      if (!aff.arret) {
        affectation = aff;
      }
    });
    return affectation;
  }

  getAffectationActuelles() {
    const affectations = this.affectations.filter((aff) => {
      return !aff.arret
    });
    return affectations.sort((a, b) => {
      return a.idvigile.jourRepos - b.idvigile.jourRepos > 0 ? 1 : -1;
    });;
  }



  getVilles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.villeService.getAll('ville').then((villes) => {
        console.log('villes');
        console.log(villes);
        resolve(villes);
      });
    });
  }

  getNationalites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.nationaliteService.getAll('nationalite').then((nationalites) => {
        console.log('nationalites');
        console.log(nationalites);
        resolve(nationalites);
      });
    });
  }

  getQuartiers(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.quartierService.getAll('quartier').then((quartiers) => {
        console.log('quartiers');
        console.log(quartiers);
        resolve(quartiers);
      });
    });
  }

  getZones(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.zoneService.getAll('zone').then((zones) => {
        console.log('zones');
        console.log(zones);
        resolve(zones);
      });
    });
  }

  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

  save() {
    console.log('vigile à enregistrer');
    console.log(this.vigile);
    if (this.vigile.dteNce) {
      this.vigile.dteNce = new Date(this.vigile.dteNce);
    }
    if (this.vigile.dateEntree) {
      this.vigile.dateEntree = new Date(this.vigile.dateEntree);
    }
    if (this.vigile.dateSortie) {
      this.vigile.dateSortie = new Date(this.vigile.dateSortie);
    }

    if (this.vigile.debutConge) {
      this.vigile.debutConge = new Date(this.vigile.debutConge);
    }
    if (this.vigile.finConge) {
      this.vigile.finConge = new Date(this.vigile.finConge);
    }

    this.vigile.noms = this.vigile.nom ? this.vigile.nom : '';
    this.vigile.noms = this.vigile.noms + ' ' + (this.vigile.prenom ? this.vigile.prenom : '');
    if (this.vigile.idvigile == 0) {
      this.processing = true;
      this.vigileService.ajouter('vigile', this.vigile).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['vigile']);
      }).catch((e) => {
        this.processing = false;
      });
    } else {
      this.processing = true;
      this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['vigile']);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  remplacant() {
    this.processing = true;
    this.vigile.estRemplacant = true;
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  unRemplacant() {
    this.processing = true;
    this.vigile.estRemplacant = false;
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.vigileService.supprimer('vigile', this.vigile.idvigile).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['vigile']);
      });
    }
  }

  edit(id: string | number) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  libelleFonction(fonction: string) {
    return this.vigileService.libelleFonction(fonction);
  }

  jourSemaine(jour: number) {
    return this.vigileService.jourSemaine(jour);
  }

  voirParrain() {
    console.log('open modal');
    const modale = document.getElementById('parrainModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  fermerParrain() {
    const modale = document.getElementById('exampleModal');

    console.log(modale);
    if (modale != null) {
      const myModal = bootstrap.Modal.getInstance(modale);
      myModal?.hide();
    }
  }
}
