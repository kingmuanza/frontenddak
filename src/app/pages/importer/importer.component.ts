import { Component, OnInit } from '@angular/core';
import { JarvisService } from 'src/app/services/jarvis.service';
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Contrat } from 'src/app/models/contrat.model';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {

  app: any;
  resultats = [""];

  contrats = new Array<Contrat>();
  sitesEnLigne = new Array<any>();
  sitesEnLocal = new Array<ContratSite>();

  indexDebutContrat = 1;
  indexDebutSite = 1;

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
    // this.importer("contratSite");
  }

  importerContrats() {
    console.log("importer contrats");
    return new Promise((resolve, reject) => {
      let index = 0;
      // Firestore
      const db = getFirestore(this.app);
      const donneesEnLigne = new Array<any>();
      this.jarvisService.getAll("contrat").then((contrats) => {
        this.resultats.push("Les données des contrats en local ont été récupérées : " + contrats.length);
        this.contrats = contrats;
        this.resultats.push("Les plus grand index pour les contrats est  : " + this.getLastIndexOfContrat());
        this.indexDebutContrat = this.getLastIndexOfContrat() + 1;

        this.jarvisService.getAll("contratSite".toLowerCase()).then((contratsSites) => {
          this.resultats.push("Les données en local ont été récupérées : " + contratsSites.length);
          this.sitesEnLocal = contratsSites;
          this.resultats.push("Les plus grand index pour les sites est  : " + this.getLastIndexOfContratSite());
          this.indexDebutSite = this.getLastIndexOfContratSite() + 1;

          const q = query(collection(db, "contratSite"));
          getDocs(q).then((querySnapshots) => {

            this.resultats.push("Les données en ligne ont elles aussi été récupérées : " + querySnapshots.size);
            querySnapshots.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              donneesEnLigne.push(doc.data());
              let contratSite: ContratSite;
              contratSite = doc.data() as ContratSite;
              let contrat = contratSite.idcontrat;
              if (!this.getContratByLibelleSansParent(contrat.libelle)) {
                this.saveContrat(contrat, this.indexDebutContrat);
                this.indexDebutContrat++;
              }

            });
            console.log("donneesEnLigne");
            console.log(donneesEnLigne);
          });

        });
      });
    });
  }

  importerSites() {
    console.log("importer sites et contrats");
    return new Promise((resolve, reject) => {
      let index = 0;
      // Firestore
      const db = getFirestore(this.app);
      const donneesEnLigne = new Array<any>();
      this.jarvisService.getAll("contrat").then((contrats) => {
        this.resultats.push("Les données des contrats en local ont été récupérées : " + contrats.length);
        this.contrats = contrats;
        this.resultats.push("Les plus grand index pour les contrats est  : " + this.getLastIndexOfContrat());
        this.indexDebutContrat = this.getLastIndexOfContrat() + 1;

        this.jarvisService.getAll("contratSite".toLowerCase()).then((contratsSites) => {
          this.resultats.push("Les données en local ont été récupérées : " + contratsSites.length);
          this.sitesEnLocal = contratsSites;
          this.resultats.push("Les plus grand index pour les sites est  : " + this.getLastIndexOfContratSite());
          this.indexDebutSite = this.getLastIndexOfContratSite() + 1;

          const q = query(collection(db, "contratSite"));
          getDocs(q).then((querySnapshots) => {

            this.resultats.push("Les données en ligne ont elles aussi été récupérées : " + querySnapshots.size);
            querySnapshots.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              donneesEnLigne.push(doc.data());
              let contratSite: ContratSite;
              contratSite = doc.data() as ContratSite;
              if (!this.getSiteByNom(contratSite.nom)) {
                this.saveContratSite(contratSite);
              }
            });
            console.log("donneesEnLigne");
            console.log(donneesEnLigne);
          });

        });
      });
    });
  }

  saveContrat(contrat: Contrat, index: number) {
    contrat.idcontrat = index;
    this.jarvisService.modifierSilent("contrat", contrat.idcontrat, contrat).then(() => {
      const phrase = "Le contrat  " + contrat.libelle + " a été ajouté à la base de données local avec l'id " + contrat.idcontrat;
      this.resultats.push(phrase);
    }).catch((e) => {
      const phrase = "Ndem Contrat" + contrat.libelle;
      this.resultats.push(phrase);
    });
  }

  saveContratSite(contratSite: ContratSite) {
    let contrat = this.getContratByLibelle(contratSite.idcontrat.libelle);
    if (contrat) {
      contratSite.idcontrat = contrat;
      this.jarvisService.ajouterSilent("contratSite".toLowerCase(), contratSite).then(() => {
        const phrase = "Le contratSite  " + contratSite.nom + " a été ajouté à la base de données local avec l'id " + contratSite.idcontratSite;
        this.resultats.push(phrase);
      }).catch((e) => {
        const phrase = "Ndem Site " + contratSite.nom;
        this.resultats.push(phrase);
      });
    }
  }

  getContratByLibelle(libelle: String): Contrat | null {
    let contrat: Contrat | null = null;
    this.contrats.forEach((element) => {
      if (element.libelle === libelle && !element.idparent ) {
        contrat = element;
      }
    });
    return contrat;
  }

  getSiteByNom(libelle: String): ContratSite | null {
    let contrat: ContratSite | null = null;
    this.sitesEnLocal.forEach((element) => {
      if (element.nom === libelle ) {
        contrat = element;
      }
    });
    return contrat;
  }

  getContratByLibelleSansParent(libelle: String): Contrat | null {
    let contrat: Contrat | null = null;
    this.contrats.forEach((element) => {
      if (element.libelle === libelle ) {
        contrat = element;
      }
    });
    return contrat;
  }

  getLastIndexOfContrat(): number {
    this.contrats = this.contrats.sort((premier, deuxieme) => {
      return premier.idcontrat - deuxieme.idcontrat > 0 ? 1 : -1;
    });
    return this.contrats[this.contrats.length - 1].idcontrat;
  }

  getLastIndexOfContratSite(): number {
    this.sitesEnLocal = this.sitesEnLocal.sort((premier, deuxieme) => {
      return premier.idcontratSite - deuxieme.idcontratSite > 0 ? 1 : -1;
    });
    return this.sitesEnLocal[this.sitesEnLocal.length - 1].idcontratSite;
  }

  mettreAJourLesCoordonneesGeographiques(nomTable: string) {
    console.log("importer sites et contrats");
    return new Promise((resolve, reject) => {
      let index = 0;
      // Firestore
      const db = getFirestore(this.app);
      const donneesEnLigne = new Array<any>();

      this.jarvisService.getAll(nomTable.toLowerCase()).then((resultats) => {
        this.resultats.push("Les données des sites en local ont été récupérées : " + resultats.length);
        this.sitesEnLocal = resultats;
        const q = query(collection(db, nomTable));
        getDocs(q).then((querySnapshots) => {
          this.resultats.push("Les données des sites en ligne ont elles aussi été récupérées : " + querySnapshots.size);
          querySnapshots.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            donneesEnLigne.push(doc.data());
            this.getSiteLocal(doc.id, nomTable, doc.data());
          });
          console.log("donneesEnLigne");
          console.log(donneesEnLigne);
          this.sitesEnLigne = donneesEnLigne;
        });
      });
    });
  }

  getSiteLocal(id: string, nomTable: string, data: any) {
    let contratSite: ContratSite | null = null;
    this.sitesEnLocal.forEach((site) => {
      if (site.idcontratSite === Number(id)) {
        contratSite = site;
      }
    });
    if (contratSite) {
      this.updateLocalSite(nomTable, contratSite, data);
    }
  }

  updateLocalSite(nomTable: string, contratSite: ContratSite, data: any) {
    contratSite.latitude = data.latitude;
    contratSite.longitude = data.longitude;
    contratSite.latitude2 = data.latitude2;
    contratSite.longitude2 = data.longitude2;
    contratSite.latitude1 = data.latitude1;
    contratSite.longitude1 = data.longitude1;
    const phrase = "constrat site " + contratSite.idcontratSite + " a été mis à jour avec les coordonnées " + contratSite.latitude + " " + contratSite.longitude;
    this.jarvisService.modifierSilent(nomTable.toLowerCase(), contratSite.idcontratSite, contratSite).then(() => {
      console.log(phrase);
      this.resultats.push(phrase);
    });
  }

  synchroniser(libelle: string) {
    return new Promise((resolve, reject) => {
      let index = 0;
      console.log('synchroniser ' + libelle);
      // Firestore
      const db = getFirestore(this.app);

      this.jarvisService.getAll(libelle.toLowerCase()).then((resultats) => {

        // this.resultats.push('resultats ' + libelle);
        console.log(resultats);

        resultats.forEach((resultat) => {
          // console.log('synchroniser ' + libelle + ' id : ' + resultat['id' + libelle]);
          const ref = doc(db, libelle, resultat['id' + libelle] + '');
          setDoc(ref, JSON.parse(JSON.stringify(resultat)), { merge: true }).then(() => {
            // this.resultats.push(libelle + ' id : ' + resultat['id' + libelle] + ' a été synchronisé');
            index++;
            if (index === resultats.length) {
              // this.resultats.push('Synchronisation ' + libelle + ' terminée');
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
