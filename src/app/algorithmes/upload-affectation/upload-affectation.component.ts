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
        let aff1 = {
          id: affectation.idvigile.idvigile + "",
          idvigile: affectation.idvigile.idvigile,
          nomsVigile: affectation.idvigile.noms,
          idposte: affectation.idposte.idposte,
          libellePoste: affectation.idposte.libelle,
          jourRepos: affectation.jourRepos,
        }
        this.resultats.push(aff1);
        if (affectation.remplacant) {
          let aff2 = {
            id: affectation.remplacant.idvigile + "",
            idvigile: affectation.remplacant.idvigile,
            nomsVigile: affectation.remplacant.noms,
            idposte: affectation.idposte.idposte,
            libellePoste: affectation.idposte.libelle,
            jourRepos: affectation.jourRepos,
            remplacant: true
          }
          this.resultats.push(aff2);
        }
        this.resultats = this.resultats.sort((a, b) => {
          return a.idvigile < b.idvigile ? -1 : 1;
        });
      });
    });
  }

  async mettreEnLigne(aff: any) {

    console.log("affectation " + aff.id);
    const db = getFirestore(this.app);
    let ref = doc(db, "affectation", aff.id);
    await setDoc(ref, JSON.parse(JSON.stringify(aff)), { merge: true });
    console.log("affectation " + aff.id + " mis ) jour");
  }

  async mettreToutEnLigne() {
    for (let index = 0; index < this.resultats.length; index++) {
      const affectation = this.resultats[index];
      await this.mettreEnLigne(affectation);
      console.log("affectations : affectation " + affectation.id + " mis à jour");
      let pause = await this.timeout(200);
      console.log(pause);
    }
  }

  timeout(ms: number): Promise<string> {
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve("pause");
    }, ms));
  }
}
