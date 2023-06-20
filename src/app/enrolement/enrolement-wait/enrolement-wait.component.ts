import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { VigileService } from 'src/app/services/vigile.service';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-enrolement-wait',
  templateUrl: './enrolement-wait.component.html',
  styleUrls: ['./enrolement-wait.component.scss']
})
export class EnrolementWaitComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<Vigile>();
  resultats = new Array<Vigile>();

  sontRemplacants = true;
  sontTitulaires = true;
  sontRemplacantsConges = true;

  horaire = '';
  matricule = '';

  mesDroits = droits;

  recherche = "";
  error = false;

  // FIREBASE

  app: any;
  constructor(
    private router: Router,
    private jarvisService: JarvisService<Vigile>,
    private vigileService: VigileService,
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
    this.actualiser();
  }

  actualiser() {
    this.vigileService.getAll().then((data) => {
      this.dtTrigger.next(data);
    });
  }

  rechercher() {
    if (this.recherche.length > 2) {
      this.error = false;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.vigileService.rechercheCalme(this.recherche).then((data) => {
          this.dtTrigger.next(data);
        });
      });
    } else {
      this.error = true;
    }
  }

  view(id: string | number) {
    this.router.navigate(['conge', 'view', id]);
  }

  libelleFonction(fonction: string) {
    return this.jarvisService.libelleFonction(fonction);
  }

  libelleStatut(jour: number) {
    if (jour == 1)
      return "Absent[e]";
    if (jour == 2)
      return "Actif[ve]";
    if (jour == 3)
      return "Licencié(e)";
    if (jour == 4)
      return "Standby";
    if (jour == 5)
      return "Suspendu[e]";
    if (jour == 6)
      return "Démissionné[e]";
    if (jour == 7)
      return "Décédé[e]";

    return "" + jour ? jour : "";
  }


  jourSemaine(jour: number) {
    return this.jarvisService.jourSemaine(jour);
  }


  afficherTitulaires(ev: any) {
    this.sontTitulaires = ev;
    this.afficherResultats();
  }

  afficherRemplacants(ev: any) {
    this.sontRemplacants = ev;
    this.afficherResultats();
  }

  afficherRemplacantsConges(ev: any) {
    this.sontRemplacantsConges = ev;
    this.afficherResultats();
  }

  afficherResultats() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.vigileService.trier(this.sontTitulaires, this.sontRemplacants, this.sontRemplacantsConges).then((data) => {
        this.dtTrigger.next(data);
      });
    });
  }

  synchroniser(vigile: Vigile) {
    return new Promise((resolve, reject) => {
      console.log('synchroniser vigile : ' + vigile.noms);
      const db = getFirestore(this.app);

      const ref = doc(db, "vigile", vigile.matricule);
      setDoc(ref, JSON.parse(JSON.stringify(vigile)), { merge: true }).then(() => {
        console.log(vigile.noms + ' a été synchronisé');
        resolve('Synchronisation du vigile terminée');
      }).catch((e) => {
        console.log('erreur');
        console.log(e);
      });
    });
  }

  mettreEnLigne(vigile: Vigile) {
    this.matricule = vigile.matricule;
    vigile.enLigne = true;
    vigile.dateEnLigne = new Date();
    this.synchroniser(vigile).then(() => {

      this.jarvisService.modifier('vigile', vigile.idvigile, vigile).then(() => {
        this.matricule = "";
        this.notifierService.notify('success', "Mise en ligne effectuée avec succès");
      }).catch((e) => {
        this.notifierService.notify('error', "Update dans la BD locale échouée");
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
