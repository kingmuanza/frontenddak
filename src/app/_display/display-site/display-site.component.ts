import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { ContratSiteVigile } from 'src/app/models/contrat.site.vigile.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-display-site',
  templateUrl: './display-site.component.html',
  styleUrls: ['./display-site.component.scss']
})
export class DisplaySiteComponent implements OnInit {

  @Input() site = new ContratSite();
  @Input() nbAutorisationJour = 0;
  @Input() nbAutorisationNuit = 0;


  @Output() onVigileCalcul = new EventEmitter<{
    jour: number,
    nuit: number,
  }>();

  calcul = {
    jour: 0,
    nuit: 0,
  };
  
  exigences = new Array<ContratSiteVigile>();
  showFormulairePersonnel = false;

  exigence = new ContratSiteVigile();

  constructor(
    private contratSiteVigileService: JarvisService<ContratSiteVigile>,
  ) { }

  ngOnInit(): void {
    this.contratSiteVigileService.getAll('contratsitevigile').then((data) => {
      // console.log('contratsitevigile');
      // console.log(data);
      this.exigences = data.filter((d) => {
        return d.idcontratsite.idcontratSite === this.site.idcontratSite
      });
      this.exigences.forEach((e) => {
        if (e.horaire === 'jour') {
          this.calcul.jour += e.quantite;
        }
        if (e.horaire === 'nuit') {
          this.calcul.nuit += e.quantite;
        }
      });
      this.onVigileCalcul.emit(this.calcul);
    });
  }

  ajouterExigencePersonnel() {
    if (this.exigence.horaire && this.exigence.quantite && this.exigence.typeVigile) {
      if (this.exigence.quantite > 0) {
        const exigenceJour = this.exigence.horaire === 'jour' && this.exigence.quantite <= this.nbAutorisationJour;
        const exigenceNuit = this.exigence.horaire === 'nuit' && this.exigence.quantite <= this.nbAutorisationNuit;
        if (exigenceJour || exigenceNuit) {
          let exigenceAModifier: ContratSiteVigile | undefined;
          this.exigences.forEach((exigence) => {
            if (exigence.typeVigile === this.exigence.typeVigile && exigence.horaire === this.exigence.horaire) {
              exigence.quantite += this.exigence.quantite;
              exigenceAModifier = exigence;
            }
          });
          if (exigenceAModifier) {
            this.contratSiteVigileService.modifier('contratsitevigile', exigenceAModifier.idcontratSiteVigile, exigenceAModifier).then(() => {
              window.location.reload();
            });
          } else {
            this.exigence.idcontratsite = this.site;
            this.contratSiteVigileService.ajouter('contratsitevigile', this.exigence).then(() => {
              window.location.reload();
            });
          }
        } else {
          alert('Le nombre de vigiles va au dela des termes du contrat');
          if (this.exigence.horaire === 'jour') {
            this.exigence.quantite = this.nbAutorisationJour;
          }
          if (this.exigence.horaire === 'nuit') {
            this.exigence.quantite = this.nbAutorisationNuit;
          }
        }
      }
    }
  }

  supprimerPosteVigile(item: ContratSiteVigile) {
    const oui = confirm('Etes vous sûr de vouloir supprimer cette exigence ?');
    if (oui) {
      this.contratSiteVigileService.supprimer('contratsitevigile', item.idcontratSiteVigile).then(() => {
        window.location.reload();
      });
    }
  }

}
