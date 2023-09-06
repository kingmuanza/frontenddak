import { Component, OnInit } from '@angular/core';
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-recap-journee',
  templateUrl: './recap-journee.component.html',
  styleUrls: ['./recap-journee.component.scss']
})
export class RecapJourneeComponent implements OnInit {
  debut = new Date();
  fin = new Date();
  app: any;
  pointages = new Array<any>();

  constructor() {
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
    this.fin.setHours(6, 0, 0); const db = getFirestore(this.app);
    const q = query(collection(db, "pointage"));
    getDocs(q).then((querySnapshots) => {
      querySnapshots.forEach((doc) => {
        let pointage = doc.data() as any;
        this.pointages.push(pointage);
      });
    });
  }

}
