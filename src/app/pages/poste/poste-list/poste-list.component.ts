import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NotifierService } from 'angular-notifier';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss']
})
export class PosteListComponent implements OnInit, OnDestroy {

  app: any;

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  postes = new Array<Poste>();
  postesSansCodeAgiv = new Array<Poste>();
  resultatsPrimaires = new Array<Poste>();
  resultats = new Array<Poste>();

  zones = new Array<ZoneDak>();
  zone = new ZoneDak();
  horaire = 'tous';
  affectations = new Array<Affectation>();
  afficher = 'tous';

  vacanteur: any = {};

  libelle = "Liste des postes récemment créés";
  nom = "";

  mesDroits = droits;

  miseEnLigneEnCours = false;
  index = 0;

  constructor(
    private router: Router,
    private posteService: JarvisService<Poste>,
    private zoneService: JarvisService<ZoneDak>,
    private affectationService: JarvisService<Affectation>,
    private posteCtrlService: PosteCtrlService,
    private authService: AuthService,
    private notifierService: NotifierService,
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyCBdaLWw5PsGl13X_jtsHIhHepIZ2bUMrE",
      authDomain: "dak-security.firebaseapp.com",
      projectId: "dak-security",
      storageBucket: "dak-security.appspot.com",
      messagingSenderId: "448692904510",
      appId: "1:448692904510:web:216883edce596209e6276f",
      measurementId: "G-L0FKMS4EQH"
    };
    this.app = initializeApp(firebaseConfig);
  }

  ngOnInit(): void {
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

    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;
      this.dtTrigger.next('');
    });
  }

  rechercher(horaire: string, zone?: ZoneDak, nom?: string) {
    this.libelle = "Résultats de la recherche";
    this.resultatsPrimaires = new Array<Poste>();
    if (zone && zone.idzone !== 0) {
      this.posteCtrlService.getPostesByZone(zone).then((postes) => {
        this.resultatsPrimaires = postes;
        if (nom) {
          this.resultatsPrimaires = this.resultatsPrimaires.filter((p) => {
            return p.libelle.toLowerCase().indexOf(nom.toLowerCase()) !== -1;
          });
        }
        this.afficherPostes(this.afficher);
      });
    } else {
      if (nom) {
        this.posteCtrlService.getPostesByName(nom).then((postes) => {
          this.resultatsPrimaires = postes;
          this.afficherPostes(this.afficher);
        });
      }
    }
  }

  mettreEnLigne(poste: Poste) {
    console.log('mettre en ligne');
    const db = getFirestore(this.app);
    return new Promise((resolve, reject) => {
      setDoc(doc(db, "poste", poste.idposte + ""), JSON.parse(JSON.stringify(poste))).then((value) => {
        console.log("Terminé");
        console.log(value);
        console.log(poste);
        resolve(poste);
      });
    });

  }

  async mettreToutEnLigne() {
    this.miseEnLigneEnCours = true;
    for (let index = 0; index < this.resultats.length; index++) {
      const poste = this.resultats[index];
      await this.mettreEnLigne(poste);
      this.index = index + 1;
    }
    this.miseEnLigneEnCours = false;
    this.notifierService.notify('success', "Mise en ligne effectuée avec succès");
  }

  afficherPostes(afficher?: string) {
    setTimeout(() => {
      this.resultats = new Array<Poste>();
      if (afficher === 'parfait') {
        const postes = this.resultatsPrimaires.filter((poste) => {
          return this.vacanteur[poste.idposte];
        });
        this.resultats = this.resultats.concat(postes);
      }
      if (afficher === 'vacant') {
        const postes = this.resultatsPrimaires.filter((poste) => {
          return !this.vacanteur[poste.idposte];
        });
        this.resultats = this.resultats.concat(postes);
      }
      if (afficher === 'tous') {
        const postes = this.resultatsPrimaires.filter((poste) => {
          return true;
        });
        this.resultats = this.resultats.concat(postes);
      }
      this.postesSansCodeAgiv = this.resultats.filter((p) => {
        return !p.codeagiv
      });
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }, 500);
  }

  initZone() {
    this.zone = new ZoneDak();
  }

  edit(id: string | number) {
    this.router.navigate(['poste', 'view', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

  isNotVacant(poste: Poste, is: boolean) {

    this.vacanteur[poste.idposte] = is

  }

  save(poste: Poste) {
    this.posteService.modifier('poste', poste.idposte, poste).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Modification effectuée avec succès");
    }).catch((e) => {
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
