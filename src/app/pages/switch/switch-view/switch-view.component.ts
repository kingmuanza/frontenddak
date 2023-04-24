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
import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';

@Component({
  selector: 'app-switch-view',
  templateUrl: './switch-view.component.html',
  styleUrls: ['./switch-view.component.scss']
})
export class SwitchViewComponent implements OnInit {


  changement = new Changement();
  posteBase?: any;
  posteSwitch?: any;
  processing = false;

  app: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private changementService: JarvisService<any>,
    private affectationService: JarvisService<Affectation>,
    private affectationCtrlService: AffectationCtrlService,
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
        this.changementService.get('switch', Number(id)).then((changement) => {
          console.log('changement');
          console.log(changement);
          this.changement = changement;
          this.affectationCtrlService.getAffectationOfVigile(this.changement.idvigileBase).then((posteBase) => {
            this.posteBase = posteBase;
            console.log("posteBase");
            console.log(posteBase);
          });
          this.affectationCtrlService.getAffectationOfVigile(this.changement.idvigileSwitch).then((posteSwitch) => {
            this.posteSwitch = posteSwitch;
            console.log("posteSwitch");
            console.log(posteSwitch);
          });
        });
      }
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
  transformer() {
    this.transformerEnAffectation().then((i) => {
      this.notifierService.notify('success', i + " affectations créés avec succès");
    });
  }

  async transformerEnAffectation() {
    let i = 0;
    let affectation1 = await this.affectationCtrlService.getAffectationOfVigile(this.changement.idvigileBase);
    let affectation2 = await this.affectationCtrlService.getAffectationOfVigile(this.changement.idvigileSwitch);
    if (affectation1) {
      affectation1.arret = new Date();
      let nouvelleAffectation = new Affectation();
      nouvelleAffectation.idvigile = this.changement.idvigileSwitch;
      nouvelleAffectation.idposte = affectation1.idposte;
      nouvelleAffectation.dateAffectation = new Date();
      nouvelleAffectation.remplacant = affectation1.remplacant;
      await this.affectationService.modifier("affectation", affectation1.idaffectation, affectation1);
      await this.affectationService.ajouter("affectation", nouvelleAffectation);
      i++;
    }
    if (affectation2) {
      if (affectation2.idaffectation) {
        if (affectation2.idaffectation != 0) {
          affectation2.arret = new Date();
          let nouvelleAffectation = new Affectation();
          nouvelleAffectation.idvigile = this.changement.idvigileBase;
          nouvelleAffectation.idposte = affectation2.idposte;
          nouvelleAffectation.dateAffectation = new Date();
          nouvelleAffectation.remplacant = affectation2.remplacant;
          await this.affectationService.modifier("affectation", affectation2.idaffectation, affectation2);
          await this.affectationService.ajouter("affectation", nouvelleAffectation);
          i++;
        }
      }
    }
    this.changement.statut = "TRANSFORMEE";
    await this.changementService.modifier("switch", this.changement.idswitch, this.changement);
    return i;
  }

}
