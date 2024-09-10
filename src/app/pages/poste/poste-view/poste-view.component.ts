import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { initializeApp } from 'firebase/app';
import { Subject } from 'rxjs';
import { FIREBASECONFIG } from 'src/app/data/FIREBASE.CONFIG';
import { Affectation } from 'src/app/models/affectation.model';
import { Equipement } from 'src/app/models/equipement.model';
import { EquipementVigile } from 'src/app/models/equipement.vigile.model';
import { PosteEquipement } from 'src/app/models/poste.equipement.model';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { PointageService } from 'src/app/services/pointage.service';
import * as bootstrap from 'bootstrap';
import { Vigile } from 'src/app/models/vigile.model';
import { ContratSiteVigile } from 'src/app/models/contrat.site.vigile.model';
import { droits } from 'src/app/data/droits';
import { AuthService } from 'src/app/services/auth.service';
import { VigileService } from 'src/app/services/vigile.service';
import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { getFirestore, setDoc, doc, query, collection, getDocs, where, deleteDoc, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Suivi } from 'src/app/models/suivi.model';
import { AffectationLigne } from 'src/app/models/affectation.ligne.model';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';


type HistoriqueStatut = {
  date: Date,
  statut: string,
}
@Component({
  selector: 'app-poste-view',
  templateUrl: './poste-view.component.html',
  styleUrls: ['./poste-view.component.scss']
})
export class PosteViewComponent implements OnInit {

  app: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  dtOptionsHistorique: DataTables.Settings = DatatablesOptions;
  dtTriggerHistorique = new Subject<any>();

  dtOptionsStatut: any = DatatablesOptions;
  dtTriggerStatut = new Subject<any>();

  poste = new Poste();
  processing = false;
  zones = new Array<any>();
  quartiers = new Array<any>();
  affectations = new Array<Affectation>();
  historiqueAffectations = new Array<Affectation>();
  affectationsLignes = new Array<any>();
  vigiles = new Array<Vigile>();
  remplacants = new Array<Vigile>();
  remplacantsDuPoste = new Array<Vigile>();

  exigencesVerifiees = false;

  vigile: any;
  remplacant: any;

  equipementsvigiles = new Array<EquipementVigile>();
  equipements = new Array<Equipement>();

  postevigile = new PosteVigile();
  postevigiles = new Array<PosteVigile>();

  posteequipement = new PosteEquipement();
  posteequipements = new Array<PosteEquipement>();

  showFormulairePersonnel = false;
  showFormulaireEquipement = false;

  myModal?: bootstrap.Modal;

  exigences = new Array<ContratSiteVigile>();
  historiquesAffectations = new Array<Affectation>();

  mesDroits = droits;
  rechercheVigile = "";
  rechercheRemplacant = "";
  affectation: Affectation | undefined;
  affectationsRemplacants = new Array<Affectation>()
  suggestions = new Array<any>();

  jourRepos = "";
  jourReposAffectation = "";

  historiqueStatus = new Array<HistoriqueStatut>()

  joursSemaine: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  estDejaAffecteeACeJour = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private pointageService: PointageService,
    private jarvisService: JarvisService<Poste>,
    private affectationService: JarvisService<Affectation>,
    private vigileService: VigileService,
    private authService: AuthService,
    private affectationCtrlService: AffectationCtrlService,
    private contratCtrlService: ContratCtrlService,
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

    this.authService.currentUserSubject.subscribe((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur) {
        try {
          this.mesDroits = JSON.parse(utilisateur.droits);
        } catch (error) {
          this.mesDroits = droits;
        }
      }

    });
    this.authService.notifier();

    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.jarvisService.get('poste', Number(id)).then((poste) => {
          console.log('le poste recupéré');
          console.log(poste);
          this.poste = poste;

          if (poste.historique) {
            try {
              this.historiqueStatus = JSON.parse(poste.historique).map((hs: any) => {
                let newHS: HistoriqueStatut;
                newHS = {
                  date: new Date(hs.date),
                  statut: hs.statut
                }
                return newHS
              });
            } catch (error) {
              this.historiqueStatus = []
            }
          }
          this.dtTriggerStatut.next("");
          this.getAffectationsEnLigne().then((affectationsLignes) => {
            this.affectationsLignes = affectationsLignes;
          });

          this.jourRepos = this.poste.jourRepos;

          this.getAffectationsInAGIV(this.poste).then((suggestions) => {
            this.suggestions = suggestions;
          });

          this.affectationCtrlService.getAffectationsOfPoste(poste).then((affectations) => {
            this.affectations = affectations;
            this.contratCtrlService.getExigencesDuSite(poste.idcontratsite!).then((exigences) => {
              this.exigences = exigences.filter((exigence) => {
                return exigence.horaire == this.poste.horaire;
              });
              this.exigencesVerifiees = this.verifierToutesLesExigences();
            });
          });

          this.affectationCtrlService.getHistoriqueAffectationsOfPoste(poste).then((affectations) => {
            this.historiqueAffectations = affectations;
            this.dtTriggerHistorique.next("");
          });

          let idcontratSite = this.poste.idcontratsite?.idcontratSite + "";
          if (idcontratSite) {
            this.pointageService.getRemoteSite(idcontratSite).then((siteRemote) => {
              console.log('siteRemote');
              console.log(siteRemote);
              if (siteRemote) {
                if (siteRemote.latitude) {
                  this.poste.latitude = siteRemote.latitude
                }
                if (siteRemote.longitude) {
                  this.poste.longitude = siteRemote.longitude
                }
              }
            });
          }
        });
      }
    });
  }

  getAffectationsEnLigne(): Promise<Array<any>> {
    console.log("get affectations");
    return new Promise(async (resolve, reject) => {
      const affectationsLignes = new Array<any>();
      const db = getFirestore(this.app);
      let q = query(collection(db, "affectation"), where("codeagiv", "==", this.poste.codeagiv));
      let resultats: QuerySnapshot<DocumentData> = await getDocs(q);
      resultats.forEach((resultat) => {
        let x = {
          id: resultat.id,
          ...resultat.data()
        }
        affectationsLignes.push(x);
      });
      let q2 = query(collection(db, "affectation-remplacant"), where("postesCodesAgiv", "array-contains", this.poste.codeagiv));
      let resultats2: QuerySnapshot<DocumentData> = await getDocs(q2);
      resultats2.forEach((resultat) => {
        let x = {
          id: resultat.id,
          ...resultat.data(),
          isRemplacant: true,
        }

        affectationsLignes.push(x);
      });
      console.log("return affectationsLignes");
      console.log(affectationsLignes.length);
      resolve(affectationsLignes);
    });
  }



  mettreEnLigne() {
    console.log('mettre en ligne');
    const db = getFirestore(this.app);
    setDoc(doc(db, "poste", this.poste.idposte + ""), JSON.parse(JSON.stringify(this.poste))).then((value) => {
      console.log("Terminé");
      console.log(value);
      console.log(this.poste);
      this.notifierService.notify('success', "Mise en ligne effectuée avec succès");
    });
  }

  async mettreEnLigneLesAffectations() {
    for (let index = 0; index < this.affectations.length; index++) {
      const affectation = this.affectations[index];
      if (affectation.idvigile) {
        let affectationLigne = new AffectationLigne();
        affectationLigne.id = affectation.idvigile.matricule
        affectationLigne.nomsVigile = affectation.idvigile.noms
        affectationLigne.matricule = affectation.idvigile.matricule
        affectationLigne.idposte = affectation.idposte.idposte
        affectationLigne.jourRepos = affectation.jourRepos
        affectationLigne.libellePoste = affectation.idposte.libelle
        affectationLigne.codeagiv = affectation.idposte.codeagiv
        const db = getFirestore(this.app);
        await setDoc(doc(db, "affectation", affectationLigne.id + ""), JSON.parse(JSON.stringify(affectationLigne)));
        console.log("Terminé");
        console.log(affectationLigne);
        this.notifierService.notify('success', "Mise en ligne de " + affectationLigne.nomsVigile + " effectuée avec succès");
      }
    }
    // await this.mettreEnLigneLesAffectationsRemplacants();
    window.location.reload();
  }

  async mettreEnLigneLesAffectationsRemplacants() {
    for (let index = 0; index < this.affectations.length; index++) {
      const affectation = this.affectations[index];
      let remplacant = affectation.remplacant;
      if (remplacant) {
        if (remplacant.idvigile) {
          console.log("remplacant", remplacant)
          let toutesAffectationsRemplacants = await this.affectationCtrlService.getAffectationsOfVigile(remplacant);
          let arrayCodesPostes = new Array<string>();
          console.log("toutesAffectationsRemplacants", toutesAffectationsRemplacants);
          if (toutesAffectationsRemplacants.length > 0)
            for (let i = 0; index < toutesAffectationsRemplacants.length; i++) {
              const element = toutesAffectationsRemplacants[i];
              if (element) {
                console.log("affecation du remplacant", element);
                arrayCodesPostes.push(element.idposte.codeagiv);
              }
            }
          arrayCodesPostes.push(affectation.idposte.codeagiv);
          console.log("arrayCodesPostes", arrayCodesPostes);
          let affectationLigne = new AffectationLigne();
          affectationLigne.id = remplacant.matricule
          affectationLigne.nomsVigile = remplacant.noms
          affectationLigne.matricule = remplacant.matricule
          affectationLigne.idposte = affectation.idposte.idposte
          affectationLigne.jourRepos = affectation.jourRepos
          affectationLigne.libellePoste = affectation.idposte.libelle
          affectationLigne.codeagiv = affectation.idposte.codeagiv
          affectationLigne.postesCodesAgiv = arrayCodesPostes;

          console.log("affectationLigne", affectationLigne);
          const db = getFirestore(this.app);
          await setDoc(doc(db, "affectation-remplacant", affectationLigne.id + ""), JSON.parse(JSON.stringify(affectationLigne)));
          console.log("Terminé");
          console.log(affectationLigne);
          this.notifierService.notify('success', "Mise en ligne du remplacant " + affectationLigne.nomsVigile + " effectuée avec succès");
        }
      }
    }
  }

  openGoogleMap() {
    let url = "https://maps.google.com/?q=" + this.poste.latitude + "," + this.poste.longitude;
    window.open(url);
  }

  getVigiles(texte: string) {
    if (texte.length > 3)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.vigiles = vigiles;
      });
  }

  getRemplacants(texte: string) {
    if (texte.length > 3) {
      console.log("getRemplacants", texte)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        console.log("getRemplacantsterminéé", texte)
        this.remplacants = vigiles;
      });
    }
  }

  isVigileVerifieExigence(vigile: Vigile, exigence: PosteVigile): boolean {
    let resultat = false;
    const isNotRemplacant = !vigile.estRemplacant && !vigile.estRemplacantConge;
    const isBonneHoraire = !(!vigile.horaire) && vigile.horaire === exigence.horaire;
    const isAgent = !(!vigile.fonction) && vigile.fonction === exigence.typeVigile;

    resultat = isNotRemplacant && isBonneHoraire && isAgent;
    return resultat;
  }


  async affecter(vigile: Vigile, remplacant: Vigile) {
    if (vigile) {
      let affectationActuelleDuVigile = await this.affectationCtrlService.getAffectationOfVigile(vigile);
      console.log('affectationActuelleDuVigile', affectationActuelleDuVigile)
      if (affectationActuelleDuVigile && affectationActuelleDuVigile.idposte) {
        let continuer = confirm("Le vigile " + vigile.noms + " est déjà affecté au poste suivant : "
          + affectationActuelleDuVigile.idposte.libelle
          + ". \nVoulez-vous mettre fin à cette affectation et créer une nouvelle ?");
        if (continuer) {
          this.saveAffectation(vigile, remplacant);
        }
      } else {
        this.saveAffectation(vigile, remplacant);
      }
    }
  }

  private saveAffectation(vigile: Vigile, remplacant: Vigile) {
    let affectation = new Affectation();
    affectation.dateAffectation = new Date();
    affectation.horaire = vigile.horaire;
    affectation.idposte = this.poste;
    affectation.idvigile = vigile;
    affectation.jourRepos = this.jourReposAffectation;

    if (remplacant) {
      affectation.remplacant = remplacant;
    }
    this.affectationService.ajouter('affectation', affectation).then(() => {
      window.location.reload();
    });
  }

  getAffectation(vigile: Vigile) {
    this.affectation = undefined;
    this.affectationCtrlService.getAffectationOfVigile(vigile).then((affectation) => {
      this.affectation = affectation;
      console.log("affectation");
      console.log(affectation);
    });
  }


  getAffectationsRemplacants(vigile: Vigile) {
    this.affectationsRemplacants = [];
    this.affectationCtrlService.getAffectationsOfVigile(vigile).then((affectations) => {
      this.affectationsRemplacants = affectations.filter((x) => !x.arret);
      console.log("affectationsRemplacants");
      console.log(this.affectationsRemplacants);
      if (this.affectationsRemplacants.length > 0) {
        this.estDejaAffecteeACeJour = this.affectationsRemplacants.map((aff) => aff.jourRepos + '').filter((jour) => this.jourReposAffectation + "" == jour + "").length > 0
      } else {
        this.estDejaAffecteeACeJour = false;
      }
    });
  }

  setEstDejaAffecteeACeJour() {
    if (this.affectationsRemplacants.length > 0) {
      this.estDejaAffecteeACeJour = this.affectationsRemplacants.map((aff) => aff.jourRepos + '').filter((jour) => this.jourReposAffectation + "" == jour + "").length > 0
    } else {
      this.estDejaAffecteeACeJour = false;
    }
  }


  jourSemaine(jour: number | string) {
    return this.jarvisService.jourSemaine(jour);
  }

  verifierExigence(exigence: ContratSiteVigile): boolean {
    return exigence.quantite == this.affectations.length;
  }

  verifierToutesLesExigences(): boolean {
    let resultat = 0;
    this.exigences.forEach((exigence) => {
      resultat += exigence.quantite;
    });
    return resultat === this.affectations.length;
  }

  openModal() {
    console.log('open modal remplacantconges');
    const modale = document.getElementById('vigilesPropositionsModal');

    console.log(modale);
    if (modale != null) {
      this.myModal = new bootstrap.Modal(modale);
      this.myModal.show();
    }
  }

  async getAffectationsInAGIV(poste: Poste): Promise<Array<Affectation>> {
    return this.affectationCtrlService.getAffectationsInAGIV(poste);
  }

  modifierJourDeRepos() {
    this.poste.jourRepos = this.jourRepos;
    this.jarvisService.modifier('poste', this.poste.idposte, this.poste).then(() => {
      this.notifierService.notify('success', "Jour de repos mis à jour avec succès");

    });
  }

  supprimer(affectationLigne: AffectationLigne) {
    let oui = confirm("Etes-vous sûr de vouloir mettre l'affectation en ligne ?");
    if (oui) {
      if (affectationLigne.isRemplacant) {
        console.log('supprimer affectationLigne du remplacant');
        const db = getFirestore(this.app);
        deleteDoc(doc(db, "affectation-remplacant", affectationLigne.id + "")).then((value) => {
          console.log("Terminé");
          console.log(value);
          console.log(affectationLigne);
          this.notifierService.notify('success', "Suppression du remplacant effectuée avec succès");
          window.location.reload();
        });
      } else {
        console.log('supprimer affectationLigne');
        const db = getFirestore(this.app);
        deleteDoc(doc(db, "affectation", affectationLigne.id + "")).then((value) => {
          console.log("Terminé");
          console.log(value);
          console.log(affectationLigne);
          this.notifierService.notify('success', "Suppression effectuée avec succès");
          window.location.reload();
        });
      }
    }
  }

  async toggleActivation() {
    this.poste.statut = this.poste.statut ? undefined : "DESACTIVEE";

    if (this.poste.statut) {
      const oui = confirm("Etes-vous sûr de voulopir désactiver le poste ? " + "Toutes les affectations seront mises à l'arrêt !".toUpperCase())
      for (let index = 0; index < this.affectations.length; index++) {
        const affectation = this.affectations[index];
        affectation.arret = new Date();
        await this.affectationService.modifier("affectation", affectation.idaffectation, affectation);
        this.notifierService.notify('success', "affectation du vigile " + affectation.idvigile.noms + " arrêtée !");
      }
    }

    let historiqueStatus = new Array<any>();
    if (this.poste.historique) {
      try {
        historiqueStatus = JSON.parse(this.poste.historique)
      } catch (error) {
        historiqueStatus = [];
      }
    }
    historiqueStatus.unshift({
      date: new Date().toISOString(),
      statut: this.poste.statut ? "INACTIF" : "ACTIF",
    });
    this.poste.historique = JSON.stringify(historiqueStatus)
    let message = this.poste.statut ? "Le poste a été désactivé avec succès" : "Le poste est maintenant actif";
    this.jarvisService.modifier('poste', this.poste.idposte, this.poste).then(() => {
      this.notifierService.notify('success', message);
      window.location.reload();
    });
  }

  supprimerToutesLesAffectations() {

  }



}
