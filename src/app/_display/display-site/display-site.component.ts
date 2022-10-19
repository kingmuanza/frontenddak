import { Component, Input, OnInit } from '@angular/core';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { contratSiteVigile } from 'src/app/models/contrat.site.vigile.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-display-site',
  templateUrl: './display-site.component.html',
  styleUrls: ['./display-site.component.scss']
})
export class DisplaySiteComponent implements OnInit {

  @Input() site = new ContratSite();
  exigences = new Array<contratSiteVigile>();
  showFormulairePersonnel = false;

  exigence = new contratSiteVigile();

  constructor(
    private contratSiteVigileService: JarvisService<contratSiteVigile>,
  ) { }

  ngOnInit(): void {
    this.contratSiteVigileService.getAll('contratsitevigile').then((data) => {
      console.log('contratsitevigile');
      console.log(data);
      this.exigences = data.filter((d) => {
        return d.idcontratsite.idcontratSite === this.site.idcontratSite
      });
    });
  }

  ajouterExigencePersonnel() {
    if (this.exigence.horaire && this.exigence.quantite && this.exigence.typeVigile) {
      if (this.exigence.quantite > 0) {
        this.exigence.idcontratsite = this.site;
        this.contratSiteVigileService.ajouter('contratsitevigile', this.exigence).then(() => {
          window.location.reload();
        });
      }
    }
  }

  supprimerPosteVigile(item: contratSiteVigile) {
    const oui = confirm('Etes vous sûr de vouloir supprimer cette exigence ?');
    if (oui) {
      this.contratSiteVigileService.supprimer('contratsitevigile', item.idcontratSiteVigile).then(() => {
        window.location.reload();
      });
    }
  }

}
