import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Poste } from 'src/app/models/poste.model';
import { ContratSite } from '../models/contrat.site.model';


@Injectable({
  providedIn: 'root'
})
export class PointageService {

  app: any;

  URL = 'http://localhost:8080/dakBack/webresources/';

  constructor(
    private http: HttpClient
  ) {

    this.app = initializeApp(FIREBASECONFIG);
  }

  getPointages(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      const pointages = new Array<any>();
      const db = getFirestore(this.app);
      getDocs(collection(db, "pointage")).then((resultats) => {
        resultats.forEach((resultat) => {
          // doc.data() is never undefined for query doc snapshots
          /* console.log(resultat.id);
          console.log(resultat.data()); */
          let x = {
            id: resultat.id,
            ...resultat.data()
          }
          pointages.push(x);
        });
        resolve(pointages);
      });
    });
  }

  getAbsences(): Promise<Array<any>> {
    console.log("get absences");
    return new Promise((resolve, reject) => {
      const absences = new Array<any>();
      const db = getFirestore(this.app);
      let q = query(collection(db, "pointage"), where("absence", "==", true));
      getDocs(q).then((resultats) => {
        resultats.forEach((resultat) => {
          let x = {
            id: resultat.id,
            ...resultat.data()
          }
          absences.push(x);
        });
        console.log("return absences");
        console.log(absences.length);
        resolve(absences);
      });
    });
  }

  getAllRemoteSites(): Promise<any> {
    return new Promise((resolve, reject) => {
      const postes = new Array<any>();
      const db = getFirestore(this.app);
      getDocs(collection(db, "contratSite")).then((resultats) => {
        resultats.forEach((resultat) => {
          // doc.data() is never undefined for query doc snapshots
          /* console.log(resultat.id);
          console.log(resultat.data()); */
          postes.push(resultat.data());
        });
        resolve(postes);
      });
    });
  }

  getAllRemotePostes(): Promise<any> {
    return new Promise((resolve, reject) => {
      const postes = new Array<any>();
      const db = getFirestore(this.app);
      getDocs(collection(db, "poste")).then((resultats) => {
        resultats.forEach((resultat) => {
          // doc.data() is never undefined for query doc snapshots
          /* console.log(resultat.id);
          console.log(resultat.data()); */
          postes.push(resultat.data());
        });
        resolve(postes);
      });
    });
  }

  getRemotePoste(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const db = getFirestore(this.app);
      getDoc(doc(db, "poste", id)).then((resultat) => {
        resolve(resultat.data());
      });
    });
  }

  getRemoteSite(id: string): Promise<ContratSite> {
    return new Promise((resolve, reject) => {
      const db = getFirestore(this.app);
      getDoc(doc(db, "contratSite", id)).then((resultat) => {
        resolve(resultat.data() as ContratSite);
      });
    });
  }

}
