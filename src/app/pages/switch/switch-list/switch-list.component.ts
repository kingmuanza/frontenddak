
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { FrLanguage } from 'src/app/data/DATATABLES.LANGUAGE';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Ville } from 'src/app/models/ville.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { Changement } from 'src/app/models/changement.model';
import { Vigile } from 'src/app/models/vigile.model';
import { Responsable } from 'src/app/models/responsable.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-switch-list',
  templateUrl: './switch-list.component.html',
  styleUrls: ['./switch-list.component.scss']
})
export class SwitchListComponent implements OnInit, OnDestroy {

  app: any;
  demande: any;
  modale: any;
  responsable: any;
  validationEnCours = false
  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  remplacements = new Array<any>();
  switchs = new Array<any>();
  resultats = new Array<any>();
  villes = new Array<Ville>();
  ville = null;
  responsables = new Array<Responsable>();

  statut = "aucun";

  montrerErreur = true;

  constructor(
    private router: Router,
    private switchService: JarvisService<any>,
    private vigileService: JarvisService<Vigile>,
    private responsableService: JarvisService<Responsable>,
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
    this.responsableService.getAll("responsable").then((responsables) => {
      this.responsables = responsables;
      this.refresh();
    });
  }

  refresh() {
    this.getSwitchs().then((remplacements) => {
      this.remplacements = remplacements;
      this.dtTrigger.next('');
    });
  }

  edit(id: number) {
    this.router.navigate(['switch', 'view', id]);
  }

  getSwitchs(): Promise<Array<any>> {
    console.log('getSwitchs');
    return new Promise((resolve, reject) => {
      const db = getFirestore(this.app);
      const q = query(collection(db, "changements"));
      getDocs(q).then((querySnapshots) => {
        let remplacements = new Array<any>();
        querySnapshots.forEach((doc) => {
          let changement: any;
          changement = doc.data();
          this.responsables.forEach((r) => {
            if (r.idresponsable === changement.idresponsable) {
              changement.idresponsable = r;
            }
          });
          if (true) {
            remplacements.push(changement);
          }
        });
        resolve(remplacements);
      });
    });
  }

  toDate(timestp: any): Date | undefined {
    if (timestp && timestp.seconds) {
      return new Date(timestp.seconds * 1000);
    } else {
      return undefined;
    }
  }

  voirDemande(s: any) {
    this.responsable = undefined;
    this.demande = s;
    this.responsables.forEach((r) => {
      if (r.idresponsable === s.idresponsable?.idresponsable) {
        this.responsable = r;
      }
    });
    console.log('open modal switchDemandeModal');
    var m = document.getElementById('switchDemandeModal');

    console.log(m);
    if (m != null) {
      this.modale = new bootstrap.Modal(m);
      this.modale.show();
    }
  }

  validerLaDemande(s: any) {
    this.montrerErreur = true;
    if (this.responsable) {
      let changement = new Changement();
      this.validationEnCours = true;
      this.vigileService.get("vigile", s.idvigile).then((vigileBase) => {
        this.vigileService.get("vigile", s.idvigileSwitch).then((vigileSwitch) => {
          changement.idvigileBase = vigileBase;
          changement.idvigileSwitch = vigileSwitch;
          changement.idresponsable = this.responsable;
          s.idresponsable = this.responsable;
          changement.date = this.toDate(s.date)!;
          this.switchService.ajouter("switch", changement).then(() => {
            s["valide"] = true;
            s.statut = "valide";
            const db = getFirestore(this.app);
            setDoc(doc(db, "changements", s.id + ""), JSON.parse(JSON.stringify(s))).then((value) => {
              console.log("Terminé");
              console.log(value);
              console.log(s);
              this.notifierService.notify('success', "Validation effectuée avec succès");
              console.log("Ajouté avec succès");
              this.modale.toggle();
              this.validationEnCours = false;
            });
          }).catch((e) => {
            console.log(e);
            this.validationEnCours = false;
          });
        });
      });
    } else {
    }

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
