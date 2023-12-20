import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vigile',
  templateUrl: './vigile.component.html',
  styleUrls: ['./vigile.component.scss']
})
export class VigileComponent implements OnInit, OnChanges {

  @Input() vigile = new Vigile();
  @Input() cliquable = true;
  @Input() long = false;
  @Output() isVigileVacant = new EventEmitter<boolean>();

  affectation: any;
  affectations = new Array<Affectation>();
  affectationsActuelles = new Array<Affectation>();

  joursSemaine = [1, 2, 3, 4, 5, 6, 7];

  vacant = true;

  constructor(
    private vigileService: JarvisService<Vigile>,
    private affectationService: JarvisService<Affectation>,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    /* console.log('Le vigile a changé');
    console.log(this.vigile.noms); */
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.getAffectionsOfVigile(this.vigile).then(() => {
      if (this.vigile.estRemplacant) {
        // this.affectationsActuelles = this.affectations.concat([]);
      } else {
        this.affectation = this.getAffectationActuelle();
        /* console.log('this.affectation');
        console.log(this.affectation); */
        if (this.affectation) {
          this.vacant = false;
        } else {
          this.vacant = true;
        }
        this.isVigileVacant.emit(this.vacant)
      }
    });
  }

  libelleFonction(fonction: string) {
    return this.vigileService.libelleFonction(fonction);
  }

  getAffectionsOfVigile(vigile: Vigile): Promise<void> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((data) => {
        /* console.log('data');
        console.log(data); */
        this.affectationsActuelles = new Array<Affectation>();
        if (vigile.estRemplacant) {
          data.forEach((affectation) => {
            if (affectation.remplacant && affectation.remplacant.idvigile === vigile.idvigile) {
              this.affectationsActuelles.push(affectation);
            }
          });
        } else {
          data.forEach((affectation) => {
            if (affectation?.idvigile?.idvigile && vigile?.idvigile && !affectation.arret) {
              if (affectation?.idvigile?.idvigile === vigile.idvigile && !affectation.arret) {
                this.affectations.push(affectation);
              }
            }
          });
        }
        resolve();
      });
    });
  }

  getAffectationActuelle() {
    let affectation: Affectation | null;
    affectation = null;
    this.affectations.forEach((aff) => {
      if (!aff.arret && aff.idvigile.idvigile === this.vigile.idvigile) {
        affectation = aff;
      }
    });
    return affectation;
  }

  getAffectationActuelles() {
    const affectations = this.affectations.filter((aff) => {
      return !aff.arret
    });
    return affectations.sort((a, b) => {
      return a.idvigile.jourRepos - b.idvigile.jourRepos > 0 ? -1 : 1;
    });
  }

  goTo(vigile: Vigile) {
    if (this.cliquable) {
      this.router.navigate(['vigile', 'view', vigile.idvigile]);
    }
  }

  voirPoste() {
    if (this.cliquable) {
      this.router.navigate(['poste', 'view', this.affectation.idposte?.idposte]);
    }
  }

  jourSemaine(jour: number) {
    return this.vigileService.jourSemaine(jour);
  }

}
