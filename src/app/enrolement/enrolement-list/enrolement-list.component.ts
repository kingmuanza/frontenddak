import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-enrolement-list',
  templateUrl: './enrolement-list.component.html',
  styleUrls: ['./enrolement-list.component.scss']
})
export class EnrolementListComponent implements OnInit {

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

  mesDroits = droits;

  recherche = "";
  error = false;

  app: any;
  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>,
    private vigileService: VigileService,
    private authService: AuthService,
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

    this.getVigilesFromFirebase().then((vigiles) => {
      this.vigiles = vigiles;
      this.dtTrigger.next(vigiles);
    });

    /* let i = 0;
    this.dtTrigger = this.vigileService.vigilesSubject;
    this.actualiser(); */
  }

  actualiser() {
    this.vigileService.getAll().then((data) => {
    });
  }

  actualiserDepuisLeServeur() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.vigileService.getAllDepuisLeServeur().then((data) => {
      });
    });
  }

  rechercher() {
    if (this.recherche.length > 2) {
      this.error = false;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.vigileService.rechercher(this.recherche);
      });
    } else {
      this.error = true;
    }
  }

  view(id: string | number) {
    this.router.navigate(['vigile', 'view', id]);
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
      });
    });
  }

  getVigilesFromFirebase(): Promise<Array<Vigile>> {
    return new Promise((resolve, reject) => {
      let vigiles = new Array<Vigile>();
      const db = getFirestore(this.app);
      const ref = collection(db, "vigile",);
      getDocs(ref).then((documents) => {
        documents.docs.forEach((doc) => {
          const vigile = doc.data() as Vigile;
          vigiles.push(vigile);
        });
        resolve(vigiles);
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
