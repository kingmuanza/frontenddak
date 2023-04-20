import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';

import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Poste } from 'src/app/models/poste.model';
import { PointageService } from 'src/app/services/pointage.service';
import { ZoneDak } from 'src/app/models/zone.model';


@Component({
  selector: 'app-pointage-list',
  templateUrl: './pointage-list.component.html',
  styleUrls: ['./pointage-list.component.scss']
})
export class PointageListComponent implements OnInit {

  app: any;

  affectations = new Array<Affectation>();
  postes = new Array<any>();
  pointages = new Array<any>();
  resultats = new Array<any>();
  zones = new Array<ZoneDak>();

  du = new Date();
  au = new Date();
  jourDeLaSemaine = -1;
  horaire = "";
  zone: any;
  recherche = false;

  dataLogiques = new Array<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jarvisService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
    private affectationService: JarvisService<Affectation>,
    private pointageService: PointageService,
  ) {
    this.app = initializeApp(FIREBASECONFIG);
    this.du.setMonth(this.du.getMonth() - 1);
  }

  genererDataLogiques() {
    let dataLogiques = new Array<any>();
    this.pointageService.getPointages().then((pointages) => {
      for (let i = 0; i < pointages.length; i++) {
        const pointage = pointages[i];
        console.log(pointage);
        const d = this.toDate(pointage.date);
        const noms = pointage.nomsVigile;
        const affectation = this.getAffectation(pointage.idvigile);
        const poste = affectation ? affectation.idposte : new Poste();
        const horaire = affectation ? affectation.horaire : '';
        const raison = pointage.raison;
        const commentaire = pointage.commentaire;
        const latitude = pointage.latitude;
        const longitude = pointage.longitude;
        const absence = pointage.absence;
        const isBonHoraire = this.isBonHoraire(pointage);

        const item = {
          date: d,
          noms: noms,
          affectation: affectation,
          poste: poste,
          horaire: horaire,
          raison: raison,
          commentaire: commentaire,
          latitude: latitude,
          longitude: longitude,
          absence: absence,
          isBonHoraire: isBonHoraire,
        };
        /* console.log('item');
        console.log(item); */
        dataLogiques.push(item);
      }
      this.dataLogiques = dataLogiques;
    });
  }


  ngOnInit(): void {
    // this.init();*
    this.init();
  }

  init() {
    this.getZones().then((zones) => {
      this.zones = zones;
      this.getPostes().then(() => {
        this.getAffectations().then((affectations) => {
          this.affectations = affectations;
        });
      });
    });
  }

  actualiser() {
    this.genererDataLogiques();
    /* this.getPointages().then(() => {
      this.rechercher();
    }); */
  }

  async getPointages() {
    this.pointageService.getPointages().then((pointages) => {
      console.log('pointages');
      console.log(pointages);
      this.pointages = pointages;
    });
  }

  getZones(): Promise<Array<ZoneDak>> {
    return new Promise((resolve, reject) => {
      this.zoneService.getAll('zone').then((zones) => {
        console.log('zones');
        console.log(zones);
        resolve(zones);
      });
    });
  }

  getAffectations(): Promise<Array<Affectation>> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((affectations) => {
        console.log('affectations');
        console.log(affectations);
        affectations = affectations.filter((aff) => {
          return !aff.arret;
        });
        resolve(affectations);
      });
    });
  }

  async getPostes() {
    this.postes = new Array<any>();
    const db = getFirestore(this.app);
    const querySnapshot = await getDocs(collection(db, "poste"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      this.postes.push(doc.data());
    });
  }

  getPoste(idposte: number): any {
    let poste: any;
    this.postes.forEach((p) => {
      if (p.idposte === idposte) {
        poste = p;
      }
    });
    return poste;
  }

  getAffectation(idvigile: number): any {
    let affectation: any;
    this.affectations.forEach((aff) => {
      if (aff.idvigile.idvigile === idvigile && !aff.arret) {
        affectation = aff;
      }
    });
    return affectation;
  }

  isBonneDate(pointage: any) {
    if (pointage.date) {
      const date = new Date(pointage.date);
      if (date.getTime() < new Date(this.au).getTime() && new Date(this.du).getTime() < date.getTime()) {
        return true;
      }
    }
    return true;
  }

  rechercher() {
    this.resultats = this.pointages;
  }

  edit(id: string) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  jourSemaine(jour: number) {
    if (jour == 1)
      return "Lundi";
    if (jour == 2)
      return "Mardi";
    if (jour == 3)
      return "Mercredi";
    if (jour == 4)
      return "Jeudi";
    if (jour == 5)
      return "Vendredi";
    if (jour == 6)
      return "Samedi";
    if (jour == 7)
      return "Dimanche";

    return "" + jour ? jour : "";
  }

  exportAsPDF() {
    console.log('exportAsPDF');
    let data = document.getElementById('fiche');
    console.log(data);
    if (data) {
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29.7);
        pdf.save('Filename.pdf');
      });
    }
  }

  toDate(timestp: any): Date {
    if (timestp.seconds) {
      return new Date(timestp.seconds * 1000);

    } else {
      return new Date();
    }
  }

  isBonneLocalisation(pointage: any): boolean {
    if (pointage.idvigile) {
      const affectation = this.getAffectation(pointage.idvigile)
      if (affectation) {
        const identifiantposte = affectation.idposte.idposte;
        if (identifiantposte) {
          const poste = this.getPoste(identifiantposte);
          if (poste) {
            const lat1 = pointage.latitude;
            const lat2 = poste.latitude;

            if (lat1 && lat2) {
              if (Math.floor(lat1) === Math.floor(lat2)) {
                return true;
              }
            }

          }
        }
      }
    }
    return false;
  }

  isBonHoraire(pointage: any) {
    const date = this.toDate(pointage.date);
    if (date.getHours()) {
      const heure = date.getHours();
      const affectation = this.getAffectation(pointage.idvigile);
      if (affectation) {
        const horaire = affectation.horaire;
        if (horaire === 'jour' && (heure < 18 && 6 <= heure)) {
          return true
        }
        if (horaire === 'nuit' && !(heure < 18 && 6 <= heure)) {
          return true
        }
      }
    }
    return false;
  }

}
