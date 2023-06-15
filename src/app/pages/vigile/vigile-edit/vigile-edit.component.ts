import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ResolveEnd } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { ZoneDak } from 'src/app/models/zone.model';
import { Quartier } from 'src/app/models/quartier.model';
import { Ville } from 'src/app/models/ville.model';
import { Nationalite } from 'src/app/models/nationalite.model';
import { Affectation } from 'src/app/models/affectation.model';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { ParrainService } from 'src/app/services/parrain.service';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-vigile-edit',
  templateUrl: './vigile-edit.component.html',
  styleUrls: ['./vigile-edit.component.scss']
})
export class VigileEditComponent implements OnInit {

  app: any;

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  affectations = new Array<Affectation>();
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

  parrains = new Array<Vigile>();
  fichiers!: FileList;
  imagechange = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private parrainService: ParrainService,
    private vigileService: JarvisService<Vigile>,
    private vigileServicePropre: VigileService,
    private affectationService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
    private quartierService: JarvisService<Quartier>,
    private villeService: JarvisService<Ville>,
    private nationaliteService: JarvisService<Nationalite>,
  ) {

    this.app = initializeApp(FIREBASECONFIG);
  }

  ngOnInit(): void {
    this.init();
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
              }
            });
          });
        });
      });
    });
  }

  initialiserVigile(id: string, villes: any[], zones: any[], nationalites: any[]) {
    this.vigileService.get('vigile', Number(id)).then((vigile) => {
      console.log('le vigile recupéré');
      this.vigile = vigile;

      if (!this.vigile.nom) {
        this.vigile.nom = this.vigile.noms;
      }

      if (this.vigile.image) {
        this.url = this.vigile.image;
      }
      console.log(this.vigile);

      this.getAffectionOfVigile(vigile).then(() => {
        this.getAffectationActuelle();
        this.dtTrigger.next('');
      });
      this.initInputsSelect(villes, zones, nationalites);
      this.getVigiles().then((vigiles) => {
        this.vigiles = vigiles;
        this.initParrain(vigile, vigiles);
      });
    });
  }

  savePhotoAndVigile() {
    this.saveImages(this.fichiers).then((url) => {
      if (url.length > 0) {
        this.vigile.image = url[0];
        this.save();
      }
    });
  }

  saveImages(fichiers: FileList): Promise<Array<string>> {
    console.log('saveImages');
    const liens = new Array<string>();
    return new Promise((resolve, reject) => {
      if (fichiers) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < fichiers.length; i++) {
          const fichier = fichiers[i];
          const storage = getStorage(this.app);
          const imagesRef = ref(storage, 'pp/' + this.vigile.idvigile + '/' + Math.floor(Math.random() * 1000000) + fichier.name);
          uploadBytes(imagesRef, fichier).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              liens.push(downloadURL);
              if (liens.length === fichiers.length) {
                resolve(liens);
              }
            });
          });
        }
      } else {
        resolve([]);
      }

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
          if (affectation.idvigile.idvigile === vigile.idvigile) {
            this.affectations.push(affectation);
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

  getQuartiers(): Promise<Array<Quartier>> {
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
    this.fichiers = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.imagechange = true;

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

  isFormulaireValide(): boolean {
    const isDateNaiss = this.vigile.dteNce ? true : false;
    const isMajeur = new Date(this.vigile.dteNce).getTime() < Vigile.getDateLimite().getTime();
    return isDateNaiss && isMajeur;
  }

  save() {

    if (this.isFormulaireValide()) {
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
          // this.router.navigate(['vigile']);
          this.vigileService.getAll('vigile').then((vigiles) => {
            const c = vigiles.sort((a, b) => {
              return a.idvigile - b.idvigile > 0 ? -1 : 1;
            })[0];
            this.router.navigate(['vigile', 'view', c.idvigile]);
          });
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
          this.router.navigate(['vigile', 'view', this.vigile.idvigile]);
        }).catch((e) => {
          this.processing = false;
        });
      }
    } else {
      alert('Le formulaire n\'est pas valide ');
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
    console.log('open modal parrainModal');
    const modale = document.getElementById('parrainModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  fermerParrain() {
    const modale = document.getElementById('parrainModal');

    console.log(modale);
    if (modale != null) {
      const myModal = bootstrap.Modal.getInstance(modale);
      myModal?.hide();
    }
  }

}
