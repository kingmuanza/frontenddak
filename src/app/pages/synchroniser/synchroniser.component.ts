import { Component, OnInit } from '@angular/core';
import { JarvisService } from 'src/app/services/jarvis.service';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-synchroniser',
  templateUrl: './synchroniser.component.html',
  styleUrls: ['./synchroniser.component.scss']
})
export class SynchroniserComponent implements OnInit {

  app: any;
  tables = ['zone', 'vigile', 'affectation', 'poste'];

  constructor(
    private jarvisService: JarvisService<any>
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
  }

  synchroniserTout() {
    this.tables.forEach((table) => {
      this.synchroniser(table).then(() => {
        console.log('Synchronisation 2 ' + table + ' terminée');
      });
    });
  }

  synchroniser(libelle: string) {
    return new Promise((resolve, reject) => {
      let index = 0;
      console.log('synchroniser ' + libelle);
      const db = getFirestore(this.app);
      this.jarvisService.getAll(libelle).then((resultats) => {
        console.log('resultats ' + libelle);
        console.log(resultats);

        resultats.forEach(resultat => {
          console.log('synchroniser ' + libelle + ' id : ' + resultat['id' + libelle]);
          const ref = doc(db, libelle, resultat['id' + libelle] + '');
          setDoc(ref, JSON.parse(JSON.stringify(resultat)), { merge: true }).then(() => {
            console.log(libelle + ' id : ' + resultat['id' + libelle] + ' a été synchronisé');
            index++;
            if (index === resultats.length) {
              console.log('Synchronisation ' + libelle + ' terminée');
              resolve('Synchronisation ' + libelle + ' terminée');
            }
          }).catch((e) => {
            console.log('erreur');
            console.log(e);
          });

        });

      });
    });
  }

}
