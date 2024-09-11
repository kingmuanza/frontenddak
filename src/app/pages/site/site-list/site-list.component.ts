import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { initializeApp } from 'firebase/app';
import { getFirestore, query, collection, where, QuerySnapshot, DocumentData, getDocs, doc, setDoc } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Quartier } from 'src/app/models/quartier.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {
  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  sites = new Array<ContratSite>();
  sitesAvec = new Array<ContratSite>();
  sitesSans = new Array<ContratSite>();
  resultats = new Array<ContratSite>();
  zones = new Array<ZoneDak>();
  zone = null;

  app: any;
  contratSitesEnLigne = new Array<any>()
  isLoadingVerifier = false;
  sitesPasEncoreEnLigne = new Array<ContratSite>()
  sitesMisEnLigne = new Array<ContratSite>()
  verificationEffectuee = false;

  constructor(
    private jarvisService: JarvisService<ContratSite>,
    private router: Router
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
    this.jarvisService.getAll('contratsite').then((data) => {
      console.log('sites');
      console.log(data);
      this.sites = data;
      this.sitesAvec = data.filter((d) => d.latitude && d.longitude);
      this.sitesSans = data.filter((d) => !(d.latitude && d.longitude));
      this.resultats = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: number | string) {
    this.router.navigate(['site', 'view', id]);
  }

  filtrer(option: string) {
    setTimeout(() => {
      this.resultats = this.sites;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
      setTimeout(() => {
        if (option === 'tous') {
          this.resultats = this.sites;
        } else if (option === 'avecCoordonnees') {
          this.resultats = this.sites.filter((site) => {
            return site.longitude && site.latitude;
          });
        } else if (option === 'sansCoordonnees') {
          this.resultats = this.sites.filter((site) => {
            return !(site.longitude && site.latitude);
          });
        }
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next('');
        });
      }, 1000);
    }, 500);
  }
  onRadioChange(option: string): void {
    if (option === 'tous') {
      // Traite la sélection de "Tous"
      console.log('Tous les sites sont sélectionnés');
      this.filtrer('tous');
    } else if (option === 'avecCoordonnees') {
      // Traite la sélection de "Afficher les sites ayant des coordonnées"
      console.log('Afficher les sites ayant des coordonnées');
      this.filtrer('avecCoordonnees');
    } else if (option === 'sansCoordonnees') {
      // Traite la sélection de "Afficher les sites sans coordonnées"
      console.log('Afficher les sites sans coordonnées');
      this.filtrer('sansCoordonnees');
    }
  }

  async verifier() {
    this.isLoadingVerifier = true
    console.log("verifier")
    let contratSitesEnLigne = new Array<any>()
    const db = getFirestore(this.app);
    let q = query(collection(db, "contratSite"));
    let resultats: QuerySnapshot<DocumentData> = await getDocs(q);
    resultats.forEach((resultat) => {
      let x = {
        id: resultat.id,
        ...resultat.data()
      }
      contratSitesEnLigne.push(x);
    });
    this.contratSitesEnLigne = contratSitesEnLigne;
    console.log("verifier terminée", this.contratSitesEnLigne.length)

    setTimeout(() => {
      this.sites = this.sites.map((resultat) => {
        return {
          ...resultat,
          enLigne: this.contratSitesEnLigne.filter((el) => el.nom == resultat.nom).length > 0
        }
      });
      this.resultats = this.sites;
      this.sitesPasEncoreEnLigne = this.sites.filter((site) => !site.enLigne)
      this.verificationEffectuee = true;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');

        this.isLoadingVerifier = false
      });
    }, 500);
  }

  async mettreLesSitesEnLigne() {
    this.sitesPasEncoreEnLigne = this.sites.filter((site) => !site.enLigne)
    for (let index = 0; index < Math.min(this.sitesPasEncoreEnLigne.length, 10); index++) {
      const site = this.sitesPasEncoreEnLigne[index];
      site.enLigne = true;
      await this.mettreLeSiteEnLigne(site)
      this.sitesMisEnLigne.push(site)
    }
  }

  async mettreLeSiteEnLigne(site: ContratSite) {

    console.log("site", site.idcontratSite);
    const db = getFirestore(this.app);
    await setDoc(doc(db, "contratSite", site.idcontratSite + ""), JSON.parse(JSON.stringify(site)));
    console.log("Site Terminé " + site.idcontratSite);

  }

  isEnLigne(site: ContratSite) {
    return this.contratSitesEnLigne.filter((el) => el.nom == site.nom).length > 0
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
