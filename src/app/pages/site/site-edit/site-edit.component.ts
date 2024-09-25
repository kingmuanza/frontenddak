import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, query, collection, QuerySnapshot, DocumentData, getDocs, where, doc, setDoc } from 'firebase/firestore';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Poste } from 'src/app/models/poste.model';
import { Quartier } from 'src/app/models/quartier.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.scss']
})
export class SiteEditComponent implements OnInit {

  site = new ContratSite()
  postes = new Array<Poste>();
  sitesEnLigne = new Array<any>();

  quartier = '';

  quartiers = new Array<Quartier>();
  montrerErreurs = false;

  erreurs = {
    nom: false,
    quartier: false,
    personne: false,
    tel: false,
    description: false,
  }
  loading = false;
  app: any;

  constructor(
    private jarvisService: JarvisService<ContratSite>,
    private quartierService: JarvisService<Quartier>,
    private router: Router,
    private route: ActivatedRoute,
    private posteCtrlService: PosteCtrlService,
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
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.jarvisService.get('contratsite', Number(id)).then((contratsite) => {
          console.log('contratsite');
          console.log(contratsite);
          this.site = contratsite;
          this.getPostes();
          this.getSigneEnLigne();

          this.quartierService.getAll('quartier').then((data) => {
            this.quartiers = data;
            this.quartier = this.site.idquartier?.nom || ""
          });
        });
      }
    });
  }

  async saveSite() {
    this.loading = true;
    await this.saveLocal();
    await this.saveEnLigne();
    this.loading = false;
    window.location.reload()
  }

  async saveLocal() {
    await this.jarvisService.modifierSilent('contratsite', this.site.idcontratSite, this.site);
  }

  async saveEnLigne() {
    const db = getFirestore(this.app);
    if (this.sitesEnLigne.length > 0)
      for (let index = 0; index < this.sitesEnLigne.length; index++) {
        const siteEnLigne = this.sitesEnLigne[index];
        siteEnLigne.nom = this.site.nom;
        await setDoc(doc(db, "contratSite", siteEnLigne.id + ""), JSON.parse(JSON.stringify(siteEnLigne)));
      }
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.posteCtrlService.getPostesOfContrat(this.site.idcontrat).then((postes) => {
        this.postes = postes.filter((p) => p.idcontratsite?.idcontratSite == this.site.idcontratSite);
      });
    });
  }

  renommerSite(ev: string) {
    console.log("quartier");
    console.log(ev);
    if (this.site.nom.toLowerCase().indexOf(ev.toLowerCase()) !== -1) {
    } else {
      this.site.nom += " " + ev;

    }
  }

  async getSigneEnLigne() {
    const db = getFirestore(this.app);
    let q = query(collection(db, "contratSite"), where("nom", "==", this.site.nom),);
    let resultats: QuerySnapshot<DocumentData> = await getDocs(q);
    resultats.forEach((resultat) => {
      let x = {
        id: resultat.id,
        ...resultat.data()
      }
      this.sitesEnLigne.push(x);
    });
  }
}
