import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from 'src/app/models/affectation.model';
import { ContratSiteVigile } from 'src/app/models/contrat.site.vigile.model';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-display-poste',
  templateUrl: './display-poste.component.html',
  styleUrls: ['./display-poste.component.scss']
})
export class DisplayPosteComponent implements OnInit, OnChanges {

  @Input() poste = new Poste();
  @Input() postesVigiles?= new Array<PosteVigile>();
  @Input() affectations = new Array<Affectation>();

  @Output() isNotVacant = new EventEmitter<boolean>();

  myPostesVigiles = new Array<PosteVigile>();
  nbJour = 0;
  nbNuit = 0;
  exigences = new Array<ContratSiteVigile>();
  notVacant = false;

  constructor(
    private contratSiteVigileService: JarvisService<ContratSiteVigile>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigate(['poste', 'view', this.poste.idposte]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getExigences();
  }

  getExigences(): void {
    this.contratSiteVigileService.getAll('contratsitevigile').then((data) => {
      // console.log('contratsitevigile');
      // console.log(data);
      this.exigences = data.filter((d) => {
        return d.idcontratsite.idcontratSite === this.poste.idcontratsite?.idcontratSite && d.horaire === this.poste.horaire;
      });
      this.notVacant = this.isAllverifiee();
      this.isNotVacant.emit(this.notVacant);
    });
  }

  isAllverifiee() {
    let resultat = true;
    this.exigences.forEach((exigence) => {
      resultat = resultat && this.isExigenceVerifiee(exigence);
    });
    return resultat;
  }


  isExigenceVerifiee(exigence: ContratSiteVigile) {
    // console.log('isExigenceVerifiee');
    // console.log(exigence.horaire + ' ' + exigence.quantite);
    let nombre = 0;
    if (exigence) {
      if (this.affectations.length > 0) {
        this.affectations.forEach((affectation) => {
          if (!affectation.arret && affectation.idvigile.fonction === exigence.typeVigile) {
            if (affectation.idposte.idposte === this.poste.idposte) {
              if (affectation.horaire === exigence.horaire) {
                // console.log(affectation.idvigile.noms);
                nombre++;
              }
            }
          }
        });
        // console.log(nombre + ' ' + exigence.quantite);
        return nombre >= exigence.quantite;
      } else {
        // console.log('affectations.length : ' + this.affectations.length);
        return false;
      }
    }
    return true;
  }

}
