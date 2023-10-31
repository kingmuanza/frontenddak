import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { Affectation } from 'src/app/models/affectation.model';
import { Suivi } from 'src/app/models/suivi.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-recap-veille',
  templateUrl: './recap-veille.component.html',
  styleUrls: ['./recap-veille.component.scss']
})
export class RecapVeilleComponent implements OnInit {

  debut = new Date();
  fin = new Date();
  app: any;
  affectations = new Array<Affectation>();
  pointages = new Array<any>();
  pointagesTotaux = new Array<any>();
  absences = new Array<any>();
  zones = new Array<ZoneDak>();
  zonesControlees = new Array<any>();
  suivis = new Array<any>();

  postesControles = new Array<any>();
  postesControlesDeuxFois = new Array<any>();

  nbVigiles = 0;
  nbVigilesQuiOntPointes = 0;
  nbVigilesQuiOntPointesDeuxFois = 0;
  vigiles = new Array<Vigile>();
  vigilesQuiOntPointes = new Array<number>();
  vigilesQuiOntPointesDeuxFois = new Array<number>();

  terminee = false;

  constructor(
    private affectationService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
    private router: Router,
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
    //this.debut.setDate(this.debut.getDate() - 1);
    this.debut.setDate(this.debut.getDate() - 8);
    this.debut.setHours(6, 0, 0);
    this.fin.setHours(6, 0, 0);

    this.zoneService.getAll("zone").then((zones) => {
      this.zones = zones.sort((a, b) => a.code.localeCompare(b.code));
    });

    this.affectationService.getAll("affectation").then((affectations) => {
      this.affectations = affectations;

      const db = getFirestore(this.app);
      const q2 = query(collection(db, "switch"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
      getDocs(q2).then((querySnapshots2) => {
        querySnapshots2.forEach((doc) => {
          let s = doc.data() as Suivi;

          this.suivis.push(s);
        });
      });
      const q = query(collection(db, "pointage"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
      // const q = query(collection(db, "pointage"), orderBy("date", 'desc'));
      getDocs(q).then((querySnapshots) => {
        querySnapshots.forEach((doc) => {
          let pointage = doc.data() as any;
          if (pointage.absence) {
            this.absences.push(pointage);
          } else {
            this.pointages.push(pointage);
          }
          this.pointagesTotaux.push(pointage);
        });

        this.pointagesTotaux.forEach((p) => {
          const code = this.getAffection(p.idvigile)?.idposte?.zone?.code;
          if (code) {
            this.zonesControlees.push(code);
          }
        });

        this.zonesControlees = [...new Set(this.zonesControlees)];

        let pointagesString = this.pointages.map((p) => {
          return p.idvigile
        });
        let findDuplicates = (arr: Array<number>) => arr.filter((item, index) => arr.indexOf(item) !== index)

        this.vigilesQuiOntPointes = [...new Set(pointagesString)];
        this.vigilesQuiOntPointesDeuxFois = [...new Set(findDuplicates(pointagesString))];

        this.postesControles = [...new Set(this.getAffectations(this.vigilesQuiOntPointes))];
        this.postesControlesDeuxFois = [...new Set(this.getAffectations(this.vigilesQuiOntPointesDeuxFois))];

        this.terminee = true;
      });
    });
  }

  isZoneControlee(zone: ZoneDak) {
    return this.zonesControlees.indexOf(zone.code) !== -1;
  }

  getAffectations(ids: Array<number>): Array<string> {
    let affs = new Array<Affectation>();
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      let aff = this.getAffection(id);
      if (aff) {
        affs.push(aff);
      }
    }
    return affs.map((a) => {
      return a.idposte.idposte;
    });
  }

  getAffection(idvigile: number): Affectation | undefined {
    console.log('idvigile');
    console.log(idvigile);
    let affectations = this.affectations.filter((aff) => {
      return aff.idvigile.idvigile == idvigile;
    })
    console.log(affectations[0])
    return affectations[0];
  }

  getAffectionByPoste(idposte: number): Affectation | undefined {
    console.log('idposte');
    console.log(idposte);
    let affectations = this.affectations.filter((aff) => {
      return aff.idposte?.idposte == idposte;
    })
    console.log(affectations[0])
    return affectations[0];
  }

  goToZone(zone: ZoneDak) {
    if (this.isZoneControlee(zone))
      this.router.navigate(["recap-veille", zone.code]);
  }

  voirPostes() {
    console.log('open modal postesModal');
    const modale = document.getElementById('postesModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  voirPostes2() {
    console.log('open modal postesModal2');
    const modale = document.getElementById('postesModal2');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  voirPointages() {
    console.log('open modal pointagesModal');
    const modale = document.getElementById('pointagesModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  voirAbsences() {
    console.log('open modal absenceModal');
    const modale = document.getElementById('absenceModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  voirSuivis() {
    console.log('open modal suivisModal');
    const modale = document.getElementById('suivisModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

}
