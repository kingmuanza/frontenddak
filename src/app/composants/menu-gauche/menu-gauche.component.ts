import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Contrat } from 'src/app/models/contrat.model';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-menu-gauche',
  templateUrl: './menu-gauche.component.html',
  styleUrls: ['./menu-gauche.component.scss']
})
export class MenuGaucheComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user: any;

  zone = false;
  ville = false;
  quartier = false;
  nationalite = false;
  equipement = false;
  statut = false;
  motif = false;

  planningremplacant = false;
  titulairevacant = false;
  postevacant = false;
  fichepointage = false;
  planningremplacantconge = false;

  pointage = false;
  affectation = false;
  switch = false;
  sanction = false;
  permission = false;
  vigile = false;
  vigileBadge = false;
  conge = false;
  contrat = false;
  poste = false;
  repos = false;

  nbContratsMauvais = 0;
  nbPostesMauvais = 0;
  intervalContrat: any;
  intervalPoste: any;

  constructor(
    private router: Router,
    private contratService: JarvisService<Contrat>,
    private posteService: JarvisService<Poste> 
  ) {

    this.intervalContrat = setInterval(() => {
      this.getMauvaisContrat();
      this.getMauvaisPoste();
    }, 10000);
  }

  private getMauvaisContrat() {
    this.contratService.getAllSilent('contrat').then((data) => {
      this.nbContratsMauvais = data.filter((contrat) => {
        return contrat.statut === 'CREE' && !contrat.idparent;
      }).length;
    });
  }

  private getMauvaisPoste() {
    this.posteService.getAllSilent('poste').then((data) => {
      this.nbPostesMauvais = data.filter((poste) => {
        return !poste.bon;
      }).length;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalContrat);
  }

  ngOnInit(): void {
    this.getMauvaisContrat();
    this.getMauvaisPoste();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.user.role === 'Administrateur') {
      this.zone = true;
      this.ville = true;
      this.quartier = true;
      this.nationalite = true;
      this.equipement = true;
      this.statut = true;
      this.motif = true;

      this.planningremplacant = true;
      this.planningremplacantconge = true;
      this.titulairevacant = true;
      this.postevacant = true;
      this.fichepointage = true;

      this.pointage = true;
      this.affectation = true;
      this.switch = true;
      this.sanction = true;
      this.permission = true;
      this.vigile = true;
      this.vigileBadge = true;
      this.conge = true;
      this.contrat = true;
      this.poste = true;
      this.repos = true;
    
    }
    if (this.user.role === 'Contrat') {
      this.postevacant = true;
      this.contrat = true;
      this.poste = true;
    }
    if (this.user.role === 'RH') {
      
      this.pointage = true;
      this.affectation = true;
      this.switch = true;
      this.sanction = true;
      this.permission = true;
      this.vigile = true;
      this.vigileBadge = true;
      this.conge = true;
      this.poste = true;
      this.repos = true;
    
    }
    if (this.user.role === 'suivi') {
     
    
    }
  }


}
