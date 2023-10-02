import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

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


  constructor(
    private affectationService: JarvisService<Affectation>
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

      this.affectations = affectations;

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
              let aff2 = {
                id: affectation.remplacant.matricule,
                idvigile: affectation.idvigile.idvigile,
                matricule: affectation.idvigile.matricule,
                nomsVigile: affectation.idvigile.noms,
                idposte: affectation.idposte.idposte,
                libellePoste: affectation.idposte.libelle,
                codeagiv: affectation.idposte.codeagiv,
                jourRepos: affectation.jourRepos,
                idremplacant: affectation.remplacant.idvigile,
                matriculeRemplacant: affectation.remplacant.matricule,
                nomsRemplacant: affectation.remplacant.noms,
                remplacant: true
              }
              this.remplacants.push(aff2);
            }
          }
          this.resultats = this.resultats.sort((a, b) => {
            return a.idvigile < b.idvigile ? -1 : 1;
          });
          this.creerRemplacantFinaux();
        }
      });
    });
  }

  async mettreEnLigneTitulaire(aff: any) {
    console.log("affectation " + aff.id);
    const db = getFirestore(this.app);
    let ref = doc(db, "affectation", aff.id);
    await setDoc(ref, JSON.parse(JSON.stringify(aff)), { merge: true });
    console.log("affectation " + aff.id + " mis à jour");
  }

  async mettreEnLigneRemplacant(aff: any) {
    console.log("affectation Remplacant" + aff.id);
    const db = getFirestore(this.app);
    let ref = doc(db, "affectation-remplacant", aff.id);
    await setDoc(ref, JSON.parse(JSON.stringify(aff)), { merge: true });
    console.log("affectation " + aff.id + " mis à jour");
  }

  async mettreToutEnLigne() {
    await this.mettreToutTitulaireEnLigne();
    await this.mettreToutRemplacantEnLigne();
  }

  async mettreToutTitulaireEnLigne() {
    for (let index = 0; index < this.resultats.length; index++) {
      const affectation = this.resultats[index];
      await this.mettreEnLigneTitulaire(affectation);
      console.log("affectations : affectation " + affectation.id + " mis à jour");
      let pause = await this.timeout(200);
      console.log(pause);
    }
  }

  async mettreToutRemplacantEnLigne() {
    for (let index = 0; index < this.remplacantsFinaux.length; index++) {
      const affectation = this.remplacantsFinaux[index];
      await this.mettreEnLigneRemplacant(affectation);
      console.log("affectations : affectation remplacant " + affectation.id + " mis à jour");
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
