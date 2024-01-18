import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { VigileService } from 'src/app/services/vigile.service';
import { Location } from '@angular/common';
import { JourPris } from 'src/app/models/jourpris.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { AffectationLigne } from 'src/app/models/affectation.ligne.model';

@Component({
  selector: 'app-affectation-temporaire-edit',
  templateUrl: './affectation-temporaire-edit.component.html',
  styleUrls: ['./affectation-temporaire-edit.component.scss']
})
export class AffectationTemporaireEditComponent implements OnInit {

  affectation = new Affectation();
  date = new Date();
  arret = new Date();
  remplacant = new Vigile();
  vigile = new Vigile();
  vigiles = new Array<Vigile>();
  remplacants = new Array<Vigile>();
  rechercheVigile = "";
  jourRepos = "";

  jourpriss = new Array<JourPris>();
  jourpris = new JourPris();
  resultats = new Array<JourPris>();

  postes = new Array<Poste>();
  zone = new ZoneDak();
  zones = new Array<ZoneDak>();

  app: any;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private affectationService: JarvisService<Affectation>,
    private affectationCtrlService: AffectationCtrlService,
    private jarvisService: JarvisService<Vigile>,
    private posteService: JarvisService<Poste>,
    private vigileService: VigileService,
    private jourprisService: JarvisService<JourPris>,
    private zoneService: JarvisService<ZoneDak>,
    private jourPrisService: JarvisService<JourPris>,
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
    this.setFin();
    this.zoneService.getAll('zone').then((data) => {
      console.log('data');
      console.log(data);
      this.zones = data;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.affectationService.get('affectation', Number(id)).then((affectation) => {
          console.log('le affectation recupéré');
          console.log(affectation);
          this.affectation = affectation;
          this.jourRepos = affectation.jourRepos;
          this.date = this.affectation.dateAffectation;
          this.vigile = this.affectation.idvigile;
          this.remplacant = this.affectation.remplacant;
          this.remplacants = [this.remplacant];
          this.vigiles = [this.vigile];
        });
      } else {
        this.affectation.dateAffectation = new Date().toISOString().split('T')[0];
      }

      this.jourprisService.getAll('jourpris').then((data) => {
        console.log('data');
        console.log(data);
        this.jourpriss = data.filter((j) => !j.consommee);
        this.resultats = data.filter((j) => !j.consommee);
      });
    });
  }

  setFin() {
    this.arret = new Date(this.date);
    let date = new Date(this.date);
    this.arret.setDate(date.getDate() + 1);
  }

  async relancer() {
    console.log(this.affectation);
    let oui = confirm("Etes-vous sur de vouloir relancer cette affectation ?");
    if (oui) {
      let aff = await this.affectationCtrlService.getAffectationOfVigile(this.affectation.idvigile);
      console.log("affectation precedente");
      console.log(aff);
      if (aff && Object.keys(aff).length) {
        this.notifierService.notify('error', "Le vigile a dejà une autre affectation en cours au poste " + aff.idposte.libelle);
      } else {
        this.affectation.arret = null;
        await this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation);
        this.notifierService.notify('success', "Affectation relancée avec succès");
        this.router.navigate(['affectation']);
      }
    }
  }

  setListePostes(zone: ZoneDak) {
    this.getPostes(zone).then((postes) => {
      this.postes = postes.sort((a, b) => {
        return a.libelle > b.libelle ? 1 : -1;
      });
    });
  }

  getPostes(zone: ZoneDak): Promise<Array<Poste>> {
    return new Promise((resolve, reject) => {
      this.posteService.getAll('poste').then((data) => {
        const postes = new Array<Poste>();
        console.log('postes');
        console.log(postes);
        data.forEach((poste) => {
          if (poste.zone.idzone == zone.idzone) {
            postes.push(poste);
          }
        });
        resolve(postes);
      });
    });
  }

  async creerAffectation() {
    if (!this.jourpris) {
      return;
    }
    this.affectation.type = "1";
    this.affectation.dateAffectation = new Date(this.date);

    this.affectation.arret = new Date(this.arret);
    let vigile = await this.jarvisService.get("vigile", this.jourpris.idsuiviPoste.idvigile.idvigile)
    this.affectation.idvigile = vigile;
    console.log("Affectation");
    console.log(this.affectation);

    this.jourpris.consommee = true;
    try {
      await this.affectationService.ajouter('affectation', this.affectation);
      await this.jourPrisService.modifier("jourpris", this.jourpris.idjourPris, this.jourpris);
      this.notifierService.notify('success', "Création d'une nouvelle affectation temporaire");
      await this.mettreEnLigneTemporaire(this.affectation);
      this.retour();

    } catch (error) {
      console.log("error")
      console.log(error)
    }
  }

  async mettreEnLigneTemporaire(affectation: Affectation) {
    let aff: AffectationLigne = {
      id: affectation.idvigile.matricule,
      idvigile: affectation.idvigile.idvigile,
      matricule: affectation.idvigile.matricule,
      nomsVigile: affectation.idvigile.noms,
      idposte: affectation.idposte.idposte,
      libellePoste: affectation.idposte.libelle,
      codeagiv: affectation.idposte.codeagiv,
      jourRepos: affectation.jourRepos,
      dateAffectation: affectation.dateAffectation,
      postesCodesAgiv: undefined
    }
    console.log("affectation temporaire " + aff.id);
    const db = getFirestore(this.app);
    let ref = doc(db, "affectation-temporaire", aff.id);
    await setDoc(ref, JSON.parse(JSON.stringify(aff)), { merge: true });
    console.log("affectation " + aff.id + " mis à jour");
    this.notifierService.notify('success', "Affectation temporaire mise en ligne");
  }

  getVigiles(texte: string) {
    if (texte.length > 4) {
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.vigiles = vigiles;
      });
      this.resultats = this.jourpriss.filter((j) => {
        return j.idsuiviPoste.idvigile.noms.toLowerCase().indexOf(texte.toLowerCase()) !== -1
      })
    } else {
      this.resultats = this.jourpriss
    }
  }

  jourSemaine(jour: number | string) {
    return this.affectationService.jourSemaine(Number(jour))
  }

  retour() {
    this._location.back();
  }

  dupliquer(affectation: Affectation): Affectation {
    let aff: Affectation = JSON.parse(JSON.stringify(affectation));
    aff.idaffectation = 0;
    aff.arret = new Date();
    return aff;
  }

}
