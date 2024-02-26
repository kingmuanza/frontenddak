import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { VigileFromWeb } from 'src/app/_types/vigile.from.web';
import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
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
  postesControlesUneFois = new Array<any>();
  postesControlesDeuxFois = new Array<any>();

  nbVigiles = 0;
  nbVigilesQuiOntPointes = 0;
  nbVigilesQuiOntPointesDeuxFois = 0;

  vigiles = new Array<Vigile>();
  vigilesQuiOntPointes = new Array<string>();
  vigilesQuiOntPointesUneFois = new Array<string>();
  vigilesQuiOntPointesDeuxFois = new Array<string>();

  terminee = false;
  remplacements = new Array<any>();

  constructor(
    private affectationService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
    private router: Router,
  ) {
    const firebaseConfig = FIREBASECONFIG;
    this.app = initializeApp(firebaseConfig);
  }

  declencher() {

    this.setDates();

    this.zoneService.getAll("zone").then((zones) => {
      this.zones = zones.sort((a, b) => a.code.localeCompare(b.code));
    });
    this.getSwitchs().then((remplacements) => {
      this.remplacements = remplacements;
    });

    this.affectationService.getAll("affectation").then((affectations) => {
      this.affectations = affectations.filter((aff) => {
        let bool1 = !aff.arret
        let bool2 = aff.arret && new Date(aff.arret).getTime() > this.fin.getTime();
        let bool = bool1 || bool2;
        return bool;
      });

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
          const code = this.getAffection(p.matricule)?.idposte?.zone?.code;
          if (code) {
            this.zonesControlees.push(code);
          }
        });

        this.zonesControlees = [...new Set(this.zonesControlees)];

        let pointagesString = this.pointages.map((p) => {
          return p.matricule;
        });
        let findDuplicates = (arr: Array<string>) => arr.filter((item, index) => arr.indexOf(item) !== index)

        this.vigilesQuiOntPointes = [...new Set(pointagesString)];
        this.vigilesQuiOntPointesDeuxFois = [...new Set(findDuplicates(pointagesString))];
        this.vigilesQuiOntPointesUneFois = this.vigilesQuiOntPointes.filter((v) => {
          return this.vigilesQuiOntPointesDeuxFois.indexOf(v) === -1;
        });

        this.postesControles = [...new Set(this.getAffectations(this.vigilesQuiOntPointes))];
        this.postesControlesDeuxFois = [...new Set(this.getAffectations(this.vigilesQuiOntPointesDeuxFois))];
        this.postesControlesUneFois = this.postesControles.filter((p) => {
          return this.postesControlesDeuxFois.indexOf(p) === -1;
        });

        this.terminee = true;
      });
    });
  }

  setDates() {
    this.debut.setDate(this.debut.getDate() - 2);
    this.debut.setHours(18, 0, 0);
    this.fin.setDate(this.fin.getDate() - 1);
    this.fin.setHours(18, 0, 0);
  }

  ngOnInit(): void {
    this.declencher();
  }

  isZoneControlee(zone: ZoneDak) {
    return this.zonesControlees.indexOf(zone.code) !== -1;
  }

  getAffectations(ids: Array<string>): Array<string> {
    let affs = new Array<Affectation>();
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      let aff = this.getAffection(id);
      if (aff) {
        affs.push(aff);
      }
    }
    return affs.map((a) => {
      return a.idposte.idposte + "";
    });
  }

  getAffection(matricule: string): Affectation | undefined {
    let affectations = this.affectations.filter((aff) => {
      return aff.idvigile?.matricule == matricule;
    })
    console.log(affectations[0])
    return affectations[0];
  }

  getAffectionByPoste(idposte: number): Affectation | undefined {
    let affectations = this.affectations.filter((aff) => {
      return aff.idposte?.idposte == idposte;
    })
    // console.log(affectations[0])
    return affectations[0];
  }

  goToZone(zone: ZoneDak) {
    if (this.isZoneControlee(zone))
      this.router.navigate(["recap-veille", zone.code]);
  }

  openModal(idElement: string) {
    console.log(`open modal ${idElement}`);
    const modale = document.getElementById(idElement);
    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }

  }

  getSwitchs(): Promise<Array<any>> {
    console.log('getSwitchs');
    return new Promise((resolve, reject) => {
      const db = getFirestore(this.app);
      const q = query(collection(db, "changements"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
      getDocs(q).then((querySnapshots) => {
        let remplacements = new Array<any>();
        querySnapshots.forEach((doc) => {
          let changement: any;
          changement = doc.data();
          remplacements.push(changement);
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

  getVigileOnPointages(matricule: string): any {
    const pointages = this.pointages.filter((p) => {
      return p.matricule === matricule;
    });
    if (pointages.length > 1) {
      const vigiles: Array<VigileFromWeb> = pointages
        .map((p) => {
          return {
            nomsVigile: p.nomsVigile,
            matricule: p.matricule,
            idvigile: p.idvigile,
            date: p.date,
            date2: p.date,
            nombre: 1,
          };
        });

      let vigile = vigiles[0];
      if (vigiles[1].date.toDate() > vigile.date2.toDate()) {
        vigile["date2"] = vigiles[1].date;
      } else {
        vigile.date2 = vigile.date;
        vigile.date = vigiles[1].date
      }
      let affectation = this.getAffection(vigile.matricule);
      vigile.nombre = pointages.length;
      vigile.poste = affectation?.idposte.libelle;
      vigile.zone = affectation?.idposte.zone.code;
      return vigile;
    } else {
      const vigiles: Array<VigileFromWeb> = pointages
        .map((p) => {
          return {
            nomsVigile: p.nomsVigile,
            matricule: p.matricule,
            idvigile: p.idvigile,
            date: p.date,
            date2: null,
            nombre: 1,
          };
        });
      let vigile = vigiles[0];
      let affectation = this.getAffection(vigile.matricule);
      vigile.nombre = pointages.length;
      vigile.poste = affectation?.idposte.libelle;
      vigile.zone = affectation?.idposte.zone.code;
      return vigile;
    }
  }

  getVigilesQuiOntPointes(): Array<any> {
    return this.vigilesQuiOntPointes.map((v) => {
      return this.getVigileOnPointages(v);
    })
  }

  getVigilesQuiOntPointesUne(): Array<any> {
    return this.vigilesQuiOntPointesUneFois.map((v) => {
      return this.getVigileOnPointages(v);
    })
  }

  getVigilesQuiOntPointesDeux(): Array<any> {
    return this.vigilesQuiOntPointesDeuxFois.map((v) => {
      return this.getVigileOnPointages(v);
    })
  }

}
