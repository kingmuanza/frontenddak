import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Affectation } from 'src/app/models/affectation.model';
import { Changement } from 'src/app/models/changement.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

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
  vigiles = new Array<Vigile>();
  poste = new Poste();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private changementService: JarvisService<any>,
    private affectationService: JarvisService<Affectation>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.changementService.get('switch', Number(id)).then((changement) => {
          console.log('changement');
          console.log(changement);
          this.changement = changement;


          this.vigileService.getAll('vigile').then((vigiles) => {
            this.vigiles = vigiles;
            vigiles.forEach((v) => {
              if (v.idvigile === this.changement.idvigileSwitch.idvigile) {
                this.changement.idvigileSwitch = v;
              }
            });
            this.posteService.getAll('poste').then((postes) => {
              console.log('postes');
              console.log(postes);
              this.postes = postes;
              postes.forEach((p) => {
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

        this.vigileService.getAll('vigile').then((vigiles) => {
          this.vigiles = vigiles;
          
          this.posteService.getAll('poste').then((postes) => {
            console.log('postes');
            console.log(postes);
            this.postes = postes;
            
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
        this.notifierService.notify('success', "Ajout effectu?? avec succ??s");
        this.router.navigate(['switch']);
      });
    } else {
      this.processing = true;
      this.changementService.modifier('switch', this.changement.idswitch, this.changement).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectu??e avec succ??s");
        this.router.navigate(['switch']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous s??r de vouloir supprimer cet ??l??ment ?");
    if (reponse) {
      this.processing = true;
      this.changementService.supprimer('switch', this.changement.idswitch).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectu??e avec succ??s");
        this.router.navigate(['switch']);
      });
    }
  }

}
