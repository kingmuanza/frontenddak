import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { AffectationLigne } from 'src/app/models/affectation.ligne.model';
import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';

@Component({
  selector: 'app-upload-affectation',
  templateUrl: './upload-affectation.component.html',
  styleUrls: ['./upload-affectation.component.scss']
})
export class UploadAffectationComponent implements OnInit {

  affectations = new Array<Affectation>();
  resultats = new Array<any>();
  remplacants = new Array<any>();
  remplacantsFinaux = new Array<any>();
  app: any;

  logs = new Array<string>();


  constructor(
    private affectationService: JarvisService<Affectation>,
    private affectationCtrlService: AffectationCtrlService,
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
    this.affectationService.getAll("affectation").then((affectations) => {

      this.affectations = affectations.filter((aff) => {
        let bool1 = !aff.arret;
        let bool2 = aff.arret && new Date(aff.arret).getTime() > new Date().getTime();
        return bool1 || bool2;
      });

      this.affectations.forEach((affectation) => {
        if (affectation.idposte) {
          let aff1 = {
            id: affectation.idvigile.matricule,
            idvigile: affectation.idvigile.idvigile,
            matricule: affectation.idvigile.matricule,
            nomsVigile: affectation.idvigile.noms,
            idposte: affectation.idposte.idposte,
            libellePoste: affectation.idposte.libelle,
            codeagiv: affectation.idposte.codeagiv,
            jourRepos: affectation.jourRepos,
          }
          this.resultats.push(aff1);
          if (affectation.remplacant) {
            if (affectation.remplacant.matricule) {
              let aff2: AffectationLigne = {
                id: affectation.remplacant.matricule,
                idvigile: affectation.remplacant.idvigile,
                matricule: affectation.remplacant.matricule,
                nomsVigile: affectation.remplacant.noms,
                idposte: affectation.idposte.idposte,
                libellePoste: affectation.idposte.libelle,
                codeagiv: affectation.idposte.codeagiv,
                jourRepos: affectation.jourRepos,
                dateAffectation: affectation.dateAffectation,
                postesCodesAgiv: [],

              }
              let agivs = this.getAffectationsDuRemplacant(aff2.matricule);
              aff2.postesCodesAgiv = agivs;
              this.remplacants.push(aff2);
            }
          }
          this.resultats = this.resultats.sort((a, b) => {
            return a.idvigile < b.idvigile ? -1 : 1;
          });
          // this.creerRemplacantFinaux();
        }
      });
    });
  }

  async mettreEnLigneTitulaire(aff: any) {
    console.log("affectation " + aff.id);
    const db = getFirestore(this.app);
    let ref = doc(db, "affectation", aff.id);
    await setDoc(ref, JSON.parse(JSON.stringify(aff)), { merge: true });
    this.log("affectation " + aff.id + " mis à jour");
  }

  async mettreEnLigneRemplacant(aff: AffectationLigne) {

    console.log("affectation Remplacant" + aff.id);
    const db = getFirestore(this.app);
    let ref = doc(db, "affectation-remplacant", aff.id);
    await setDoc(ref, JSON.parse(JSON.stringify(aff)), { merge: true });
    this.log("affectation " + aff.id + " mis à jour");
  }

  getAffectationsDuRemplacant(matriculeRemplacant: string): string[] {
    let affs = this.affectations.filter((aff) => {
      return aff.remplacant && aff.remplacant.matricule == matriculeRemplacant;
    });
    return affs.map((aff) => {
      return aff.idposte.codeagiv;
    })
  }

  async suppressionTitulaires() {
    const db = getFirestore(this.app);
    const q = query(collection(db, "affectation"),);
    let querySnapshots = await getDocs(q);

    this.log("Supression des anciennes affectations des titulaires")

    for (let index = 0; index < querySnapshots.docs.length; index++) {
      const aff = querySnapshots.docs[index].data() as any;
      let ref = doc(db, "affectation", aff.id);
      await deleteDoc(ref);
      this.log("Supression de l'affectation : " + aff.id);
    }
  }

  async suppressionRemplacants() {
    const db = getFirestore(this.app);
    const q = query(collection(db, "affectation-remplacant"),);
    let querySnapshots = await getDocs(q);

    this.log("Supression des anciennes affectations des remplacants")

    for (let index = 0; index < querySnapshots.docs.length; index++) {
      const aff = querySnapshots.docs[index].data() as any;
      let ref = doc(db, "affectation-remplacant", aff.id);
      await deleteDoc(ref);
      this.log("Supression de l'affectation remplacant : " + aff.id);
    }
  }

  async mettreToutEnLigne() {
    this.log('Début, ne fermez pas la fenêtre !!!');
    await this.suppressionTitulaires();
    await this.mettreToutTitulaireEnLigne();

    await this.suppressionRemplacants();
    await this.mettreToutRemplacantEnLigne();
    this.log('Terminé !!!');
  }

  async mettreToutTitulaireEnLigne() {
    for (let index = 0; index < this.resultats.length; index++) {
      const affectation = this.resultats[index];
      await this.mettreEnLigneTitulaire(affectation);
      console.log("affectation " + affectation.id + " mis à jour");
      let pause = await this.timeout(200);
      console.log(pause);
    }
  }

  log(l: string) {
    console.log(l);
    this.logs.unshift(l)
  }

  async mettreToutRemplacantEnLigne() {
    for (let index = 0; index < this.remplacantsFinaux.length; index++) {
      const affectation = this.remplacantsFinaux[index];
      await this.mettreEnLigneRemplacant(affectation);
      console.log("remplacant " + affectation.id + " mis à jour");
      let pause = await this.timeout(200);
      console.log(pause);
    }
  }

  async creerRemplacantFinaux() {
    this.remplacantsFinaux = [];
    for (let index = 0; index < this.remplacants.length; index++) {
      let aff = this.remplacants[index];
      const postes = this.remplacants.filter((r) => {
        return r.id === aff.id;
      });
      const postesCodeAgiv = postes.map((r) => {
        return r.codeagiv;
      });
      const postesLibelle = postes.map((r) => {
        return r.libelle;
      });
      aff.postesCodesAgiv = [...new Set(postesCodeAgiv)];
      // aff.postesCodes = [...new Set(postesLibelle)];
      this.remplacantsFinaux.push(aff);
    }
  }

  timeout(ms: number): Promise<string> {
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve("pause");
    }, ms));
  }
}
