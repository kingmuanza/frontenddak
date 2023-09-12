import { Component, OnInit } from '@angular/core';
import { collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { Affectation } from 'src/app/models/affectation.model';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { ZoneDak } from 'src/app/models/zone.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recap-journee',
  templateUrl: './recap-journee.component.html',
  styleUrls: ['./recap-journee.component.scss']
})
export class RecapJourneeComponent implements OnInit {
  debut = new Date();
  fin = new Date();
  app: any;
  affectations = new Array<Affectation>();
  pointages = new Array<any>();
  pointagesTotaux = new Array<any>();
  absences = new Array<any>();
  zones = new Array<ZoneDak>();
  zonesControlees = new Array<any>();

  postesControles = new Array<any>();
  postesControlesDeuxFois = new Array<any>();

  nbVigiles = 0;
  nbVigilesQuiOntPointes = 0;
  nbVigilesQuiOntPointesDeuxFois = 0;
  vigiles = new Array<Vigile>();
  vigilesQuiOntPointes = new Array<number>();
  vigilesQuiOntPointesDeuxFois = new Array<number>();

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
    this.debut.setDate(this.debut.getDate() - 1);
    this.debut.setHours(6, 0, 0);
    this.fin.setHours(6, 0, 0);

    this.zoneService.getAll("zone").then((zones) => {
      this.zones = zones.sort((a, b) => a.code.localeCompare(b.code));
    });

    this.affectationService.getAll("affectation").then((affectations) => {
      this.affectations = affectations;

      const db = getFirestore(this.app);
      const q = query(collection(db, "pointage"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
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

  goToZone(zone: ZoneDak) {
    if (this.isZoneControlee(zone))
      this.router.navigate(["recap-veille", zone.code]);
  }

}
