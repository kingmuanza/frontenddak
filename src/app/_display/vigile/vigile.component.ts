import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vigile',
  templateUrl: './vigile.component.html',
  styleUrls: ['./vigile.component.scss']
})
export class VigileComponent implements OnInit {

  @Input() vigile = new Vigile();
  @Input() cliquable = true;
  @Input() long = false;
  affectation: any;
  affectations = new Array<Affectation>();
  affectationsActuelles = new Array<Affectation>();

  constructor(
    private vigileService: JarvisService<Vigile>,
    private affectationService: JarvisService<Affectation>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAffectionOfVigile(this.vigile).then(() => {
      if (this.vigile.estRemplacant) {
        this.affectationsActuelles = this.getAffectationActuelles();
      } else {
        this.affectation = this.getAffectationActuelle();
      }
    });
  }
  
  libelleFonction(fonction: string) {
    return this.vigileService.libelleFonction(fonction);
  }

  getAffectionOfVigile(vigile: Vigile): Promise<void> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((data) => {
        /* console.log('data');
        console.log(data); */
        if (vigile.estRemplacant) {
          data.forEach((affectation) => {
            if (affectation.remplacant && affectation.remplacant.idvigile === vigile.idvigile) {
              this.affectations.push(affectation);
            }
          });
        } else {
          data.forEach((affectation) => {
            if (affectation.idvigile.idvigile === vigile.idvigile) {
              this.affectations.push(affectation);
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
      if (!aff.arret) {
        affectation = aff;
      }
    });
    return affectation;
  }

  getAffectationActuelles() {
    const affectations = this.affectations.filter((aff) => {
      return !aff.arret
    });
    return affectations.sort((a,b) => {
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
      this.router.navigate(['poste', 'edit', this.affectation.idposte?.idposte]);
    }
  }

  jourSemaine(jour: number) {
    return this.vigileService.jourSemaine(jour);
  }

}
