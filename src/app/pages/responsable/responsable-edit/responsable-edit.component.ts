import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Responsable } from 'src/app/models/responsable.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-responsable-edit',
  templateUrl: './responsable-edit.component.html',
  styleUrls: ['./responsable-edit.component.scss']
})
export class ResponsableEditComponent implements OnInit {

  responsable = new Responsable();
  processing = false;

  app: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private responsableService: JarvisService<Responsable>
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
        this.responsableService.get('responsable', Number(id)).then((responsable) => {
          console.log('responsable');
          console.log(responsable);
          this.responsable = responsable;
        });
      }
    });
  }

  save() {
    console.log(this.responsable);
    if (this.responsable.idresponsable == 0) {
      this.processing = true;
      this.responsableService.ajouter('responsable', this.responsable).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.sauvegarderEnLigne(this.responsable).then(() => {
          this.router.navigate(['responsable']);
        });
      });
    } else {
      this.processing = true;
      this.responsableService.modifier('responsable', this.responsable.idresponsable, this.responsable).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.sauvegarderEnLigne(this.responsable).then(() => {
          this.router.navigate(['responsable']);
        });
      });
    }
  }

  async sauvegarderEnLigne(responsable: Responsable) {
    let responsables = await this.responsableService.getAll('responsable');
    const dernier = responsables.sort((a, b) => {
      return a.idresponsable - b.idresponsable > 0 ? -1 : 1;
    })[0];
    console.log("Derrnier index");
    console.log(dernier);
    const db = getFirestore(this.app);
    return new Promise((resolve, reject) => {
      const ref = doc(db, 'responsable', dernier.idresponsable + '');
      setDoc(ref, JSON.parse(JSON.stringify(dernier)), { merge: true }).then(() => {
        resolve(responsable);
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
      this.responsableService.supprimer('responsable', this.responsable.idresponsable).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['responsable']);
      });
    }
  }

}
