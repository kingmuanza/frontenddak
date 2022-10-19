import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';

@Component({
  selector: 'app-display-poste',
  templateUrl: './display-poste.component.html',
  styleUrls: ['./display-poste.component.scss']
})
export class DisplayPosteComponent implements OnInit, OnChanges {

  @Input() poste = new Poste();
  @Input() postesVigiles?= new Array<PosteVigile>();
  myPostesVigiles = new Array<PosteVigile>();
  nbJour = 0;
  nbNuit = 0;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigate(['poste', 'view', this.poste.idposte]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.postesVigiles) {
      if (this.postesVigiles.length > 0) {
        this.myPostesVigiles = this.postesVigiles.filter((pv) => {
          return pv.idposte.idposte === this.poste.idposte;
        });
        this.nbJour = this.getJour();
        this.nbNuit = this.getNuit();
      } else {
        this.nbJour = this.poste.nombreVigileJour;
        this.nbNuit = this.poste.nombreVigileNuit;
      }
    } else {
      this.nbJour = this.poste.nombreVigileJour;
      this.nbNuit = this.poste.nombreVigileNuit;
    }
  }

  getJour(): number {
    let nombre = 0;
    this.myPostesVigiles.forEach((pv) => {
      if (pv.horaire == 'jour') {
        nombre += pv.quantite;
      }
    });
    return nombre;
  }
  getNuit(): number {
    let nombre = 0;
    this.myPostesVigiles.forEach((pv) => {
      if (pv.horaire == 'nuit') {
        nombre += pv.quantite;
      }
    });
    return nombre;
  }
}
