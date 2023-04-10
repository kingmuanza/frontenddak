import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { Contrat } from 'src/app/models/contrat.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-display-historique-contrat',
  templateUrl: './display-historique-contrat.component.html',
  styleUrls: ['./display-historique-contrat.component.scss']
})

export class DisplayHistoriqueContratComponent implements OnInit, OnChanges {

  @Input() contrat = new Contrat();
  contratsHistoriques = new Array<Contrat>();
  isReady = false;

  constructor(
    private contratCtrlService: ContratCtrlService,
    private contratService: JarvisService<Contrat>,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getHistoriqueDesContrats();
  }

  ngOnChanges() {
    this.getHistoriqueDesContrats();
  }

  private getHistoriqueDesContrats() {
    if (this.contrat.idcontrat !== 0) {
      console.log("getHistoriqueDesContrats".toLocaleUpperCase());
      this.contratsHistoriques = [];
      this.isReady = false;
      this.contratCtrlService.getHistoriqueDesContrats(this.contrat).then((contrats) => {
        this.contratsHistoriques = contrats;
        this.isReady = true;
      });
    }
  }

  supprimer(c: Contrat) {
    const oui = confirm("Etes-vous sûr de vouloir supprimer l'historique de ce contrat");
    if (oui) {
      this.contratService.supprimer("contrat", c.idcontrat).then(() => {
        this.notifierService.notify('success', "Historique supprimée");
        this.getHistoriqueDesContrats();
      }).catch((e) => {
        console.log("erreur");
        console.log(e);
        this.notifierService.notify('error', "Erreur lors de la suppression");
        this.getHistoriqueDesContrats();
      });
    }
  }

}
