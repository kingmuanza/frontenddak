import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { droits } from 'src/app/data/droits';
import { Contrat } from 'src/app/models/contrat.model';
import { Poste } from 'src/app/models/poste.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-menu-gauche',
  templateUrl: './menu-gauche.component.html',
  styleUrls: ['./menu-gauche.component.scss']
})
export class MenuGaucheComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user: any;

  mesDroits = droits;

  nbContratsMauvais = 0;
  nbPostesMauvais = 0;
  intervalContrat: any;
  intervalPoste: any;

  constructor(
    private authService: AuthService,
    private contratService: JarvisService<Contrat>,
    private posteService: JarvisService<Poste>
  ) {

  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur) {
        try {
          this.mesDroits = JSON.parse(utilisateur.droits);
        } catch (error) {
          this.mesDroits = droits;
        }
      }

    });
    this.authService.notifier();
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

  ngOnChanges(changes: SimpleChanges): void {

  }


}
