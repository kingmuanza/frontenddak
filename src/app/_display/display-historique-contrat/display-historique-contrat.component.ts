import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { Contrat } from 'src/app/models/contrat.model';

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
  ) { }

  ngOnInit(): void {
    this.getHistoriqueDesContrats();
  }

  ngOnChanges() {
    this.getHistoriqueDesContrats();
  }

  private getHistoriqueDesContrats() {
    console.log("getHistoriqueDesContrats".toLocaleUpperCase());
    this.contratsHistoriques = [];
    this.isReady = false;
    this.contratCtrlService.getHistoriqueDesContrats(this.contrat).then((contrats) => {
      this.contratsHistoriques = contrats;
      this.isReady = true;
    });
  }

}
