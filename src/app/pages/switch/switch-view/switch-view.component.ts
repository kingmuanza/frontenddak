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

  app: any;

  constructor(
    private route: ActivatedRoute,
    private changementService: JarvisService<any>,
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

}