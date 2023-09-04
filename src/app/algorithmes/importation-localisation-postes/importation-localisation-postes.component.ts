import { Component, OnInit } from '@angular/core';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { ContratSite } from 'src/app/models/contrat.site.model';

@Component({
  selector: 'app-importation-localisation-postes',
  templateUrl: './importation-localisation-postes.component.html',
  styleUrls: ['./importation-localisation-postes.component.scss']
})
export class ImportationLocalisationPostesComponent implements OnInit {

  postes = new Array<Poste>();
  sites = new Array<ContratSite>();
  noms = new Array<string>();
  app: any;

  constructor(
    private posteService: JarvisService<Poste>,
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
    this.posteService.getAll("poste").then((postes) => {
      this.postes = postes.filter((p) => {
        return p.idcontratsite;
      });
      this.postes = this.postes.sort((p1, p2) => {
        return p1.idcontratsite!.nom.localeCompare(p2.idcontratsite!.nom);
      });
    });
    const db = getFirestore(this.app);
    const q = query(collection(db, "contratSite"));
    getDocs(q).then((querySnapshots) => {
      querySnapshots.forEach((doc) => {
        let contratSite: ContratSite;
        contratSite = doc.data() as ContratSite;
        this.sites.push(contratSite);
        this.noms.push(contratSite.nom);
      });
    });
  }

  existeEnLigne(poste: Poste): number {
    return this.noms.indexOf(poste.idcontratsite!.nom);
  }

  async savePoste(poste: Poste) {
    console.log("Poste : " + poste.libelle);
    let site = this.sites[this.existeEnLigne(poste)];
    if (site) {
      console.log("site : " + site.nom)
      poste.longitude = site.longitude;
      poste.longitude1 = site.longitude1;
      poste.longitude2 = site.longitude2;
      poste.latitude = site.latitude;
      poste.latitude1 = site.latitude1;
      poste.latitude2 = site.latitude2;
      await this.posteService.modifier("poste", poste.idposte, poste);
      console.log("poste " + poste.idposte + " mis à jour")
    }
  }

  async saveAllPostes() {
    for (let index = 0; index < this.postes.length; index++) {
      const poste = this.postes[index];
      await this.savePoste(poste);
      console.log("postes : poste " + poste.idposte + " mis à jour");
      let pause = await this.timeout(500);
      console.log(pause);
    }
  }

  timeout(ms: number): Promise<string> {
    return new Promise((resolve, reject) => setTimeout(() => {
      resolve("pause");
    }, ms));
  }
}
