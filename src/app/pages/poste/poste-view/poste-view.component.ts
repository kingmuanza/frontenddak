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
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Suivi } from 'src/app/models/suivi.model';

@Component({
  selector: 'app-poste-view',
  templateUrl: './poste-view.component.html',
  styleUrls: ['./poste-view.component.scss']
})
export class PosteViewComponent implements OnInit {

  app: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  poste = new Poste();
  processing = false;
  zones = new Array<any>();
  quartiers = new Array<any>();
  affectations = new Array<Affectation>();
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

  mesDroits = droits;
  rechercheVigile = "";
  rechercheRemplacant = "";
  affectation: Affectation | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private pointageService: PointageService,
    private jarvisService: JarvisService<any>,
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

          this.affectationCtrlService.getAffectationsOfPoste(poste).then((affectations) => {
            this.affectations = affectations;
            this.contratCtrlService.getExigencesDuSite(poste.idcontratsite).then((exigences) => {
              this.exigences = exigences.filter((exigence) => {
                return exigence.horaire == this.poste.horaire;
              });
              this.exigencesVerifiees = this.verifierToutesLesExigences();
            });
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

  openGoogleMap() {
    let url = "https://maps.google.com/?q=" + this.poste.latitude + "," + this.poste.longitude;
    window.open(url);
  }

  getVigiles(texte: string) {
    this.vigileService.rechercheCalme(texte).then((vigiles) => {
      this.vigiles = vigiles;
    });
  }

  getRemplacants(texte: string) {
    this.vigileService.rechercheCalme(texte).then((vigiles) => {
      this.remplacants = vigiles;
    });
  }

  isVigileVerifieExigence(vigile: Vigile, exigence: PosteVigile): boolean {
    let resultat = false;
    const isNotRemplacant = !vigile.estRemplacant && !vigile.estRemplacantConge;
    const isBonneHoraire = !(!vigile.horaire) && vigile.horaire === exigence.horaire;
    const isAgent = !(!vigile.fonction) && vigile.fonction === exigence.typeVigile;

    resultat = isNotRemplacant && isBonneHoraire && isAgent;
    return resultat;
  }


  affecter(vigile: Vigile, remplacant: Vigile) {
    if (vigile) {
      let affectation = new Affectation();
      affectation.dateAffectation = new Date();
      affectation.horaire = vigile.horaire;
      affectation.idposte = this.poste;
      affectation.idvigile = vigile;
      if (remplacant) {
        affectation.remplacant = remplacant;
      }

      if (this.affectation && this.affectation.idposte) {
        this.affectation.arret = new Date();
        this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
          this.affectationService.ajouter('affectation', affectation).then(() => {
            window.location.reload();
          });
        });
      } else {
        this.affectationService.ajouter('affectation', affectation).then(() => {
          window.location.reload();
        });
      }
    }
  }

  getAffectation(vigile: Vigile) {
    this.affectation = undefined;
    this.affectationCtrlService.getAffectationOfVigile(vigile).then((affectation) => {
      this.affectation = affectation;
      console.log("affectation");
      console.log(affectation);
    });
  }

  jourSemaine(jour: number) {
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

}
