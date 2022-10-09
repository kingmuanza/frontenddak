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
  affectation: any;
  affectations = new Array<Affectation>();

  constructor(
    private vigileService: JarvisService<Vigile>,
    private affectationService: JarvisService<Affectation>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAffectionOfVigile(this.vigile).then(() => {
      this.affectation = this.getAffectationActuelle();
    });
  }
  
  libelleFonction(fonction: string) {
    return this.vigileService.libelleFonction(fonction);
  }

  getAffectionOfVigile(vigile: Vigile): Promise<void> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        data.forEach((affectation) => {
          if (affectation.idvigile.idvigile === vigile.idvigile) {
            this.affectations.push(affectation);
          }
        });
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

  goTo() {
    if (this.cliquable) {
      this.router.navigate(['vigile', 'view', this.vigile.idvigile]);
    }
  }

  voirPoste() {
    if (this.cliquable) {
      this.router.navigate(['poste', 'edit', this.affectation.idposte?.idposte]);
    }
  }

}
