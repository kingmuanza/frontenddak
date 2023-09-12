import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Affectation } from 'src/app/models/affectation.model';
import { Changement } from 'src/app/models/changement.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Responsable } from 'src/app/models/responsable.model';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-switch-edit',
  templateUrl: './switch-edit.component.html',
  styleUrls: ['./switch-edit.component.scss']
})
export class SwitchEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  changement = new Changement();
  affectations = new Array<Affectation>();
  affectationsResultats = new Array<Affectation>();
  postes = new Array<Poste>();
  vigilesBases = new Array<Vigile>();
  vigilesSwitchs = new Array<Vigile>();
  responsables = new Array<Responsable>();
  poste = new Poste();
  processing = false;

  app: any;


  rechercheVigile = "";
  rechercheVigileSwitch = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private changementService: JarvisService<Changement>,
    private affectationService: JarvisService<Affectation>,
    private posteService: JarvisService<Poste>,
    private responsableService: JarvisService<Responsable>,
    private vigileService: VigileService,
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

    this.responsableService.getAll("responsable").then((responsables) => {
      this.responsables = responsables;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.changementService.get('switch', Number(id)).then((changement) => {
          console.log('changement');
          console.log(changement);
          this.changement = changement;


          this.vigileService.rechercheCalme(this.changement.idvigileSwitch.noms).then((vigiles) => {

            vigiles.forEach((v) => {
              if (v.idvigile === this.changement.idvigileSwitch.idvigile) {
                this.changement.idvigileSwitch = v;
              }
            });
            this.posteService.getAll('poste').then((postes) => {
              console.log('postes');
              console.log(postes);
              this.postes = postes.sort((a, b) => a.libelle.localeCompare(b.libelle));
              this.postes.forEach((p) => {
                if (p.idposte === this.changement.idaffectation.idposte.idposte) {
                  this.poste = p;
                }
              });
              this.affectationService.getAll('affectation').then((affectations) => {
                console.log('affectations');
                console.log(affectations);
                affectations.forEach((a) => {
                  if (!a.arret) {
                    this.affectations.push(a);
                  }

                  if (a.idaffectation = this.changement.idaffectation.idaffectation) {
                    this.changement.idaffectation = a;
                    this.changement.idvigileBase = a.idvigile;
                  }
                });
                this.affectationsResultats = new Array<Affectation>().concat(this.affectations);
              });
            });
          });
        });
      } else {
        this.posteService.getAll('poste').then((postes) => {
          console.log('postes');
          console.log(postes);
          this.postes = postes.sort((a, b) => a.libelle.localeCompare(b.libelle));

          this.affectationService.getAll('affectation').then((affectations) => {
            console.log('affectations');
            console.log(affectations);
            affectations.forEach((a) => {
              if (!a.arret) {
                this.affectations.push(a);
              }

            });
            this.affectationsResultats = new Array<Affectation>().concat(this.affectations);
          });
        });
      }
    });
  }

  getAffectations() {
    console.log('getAffectations');
    this.affectationsResultats = new Array<Affectation>().concat(this.affectations);
    setTimeout(() => {
      this.affectationsResultats = this.affectationsResultats.filter((affectation) => {
        return affectation.idposte.idposte === this.poste.idposte;
      });
    }, 250);
  }

  save() {
    console.log(this.changement);
    this.changement.idvigileBase = this.changement.idaffectation.idvigile;
    if (this.changement.idswitch == 0) {
      this.processing = true;
      this.changementService.ajouter('switch', this.changement).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.envoyerEnLigne().then(() => {
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['switch']);
        }).catch(() => {
          this.notifierService.notify('error', "Impossible de mettre en ligne");
        });
      });
    } else {
      this.processing = true;
      this.changementService.modifier('switch', this.changement.idswitch, this.changement).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['switch']);
      });
    }
  }

  async envoyerEnLigne() {
    let switches = await this.changementService.getAll('switch');
    const dernier = switches.sort((a, b) => {
      return a.idswitch - b.idswitch > 0 ? -1 : 1;
    })[0];
    console.log("Derrnier index");
    console.log(dernier);
    const db = getFirestore(this.app);
    return new Promise((resolve, reject) => {
      const ref = doc(db, 'switch', dernier.idswitch + '');
      setDoc(ref, JSON.parse(JSON.stringify(dernier)), { merge: true }).then(() => {
        resolve(dernier);
      }).catch((e) => {
        console.log('erreur');
        console.log(e);
        reject(e)
      });
    });
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.changementService.supprimer('switch', this.changement.idswitch).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['switch']);
      });
    }
  }

  getVigiles(texte: string) {
    if (texte.length > 4)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.vigilesBases = vigiles;
      });
  }

  getVigilesSwitch(texte: string) {
    if (texte.length > 4)
      this.vigileService.rechercheCalme(texte).then((vigiles) => {
        this.vigilesSwitchs = vigiles;
      });
  }

}
