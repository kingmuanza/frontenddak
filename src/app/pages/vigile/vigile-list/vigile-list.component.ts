import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vigile-list',
  templateUrl: './vigile-list.component.html',
  styleUrls: ['./vigile-list.component.scss']
})
export class VigileListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<Vigile>();
  resultats = new Array<Vigile>();

  sontRemplacants = true;
  sontTitulaires = true;
  sontRemplacantsConges = true;

  horaire = '';

  mesDroits = droits;

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>,
    private authService: AuthService,
  ) { }

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
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      this.vigiles = data;
      this.resultats = data;
      this.dtTrigger.next('');
    });
  }

  view(id: string | number) {
    this.router.navigate(['vigile', 'view', id]);
  }

  libelleFonction(fonction: string) {
    return this.jarvisService.libelleFonction(fonction);
  }

  libelleStatut(jour: number) {
    if (jour == 1)
      return "Absent[e]";
    if (jour == 2)
      return "Actif[ve]";
    if (jour == 3)
      return "Licencié(e)";
    if (jour == 4)
      return "Standby";
    if (jour == 5)
      return "Suspendu[e]";
    if (jour == 6)
      return "Démissionné[e]";
    if (jour == 7)
      return "Décédé[e]";

    return "" + jour ? jour : "";
  }


  jourSemaine(jour: number) {
    return this.jarvisService.jourSemaine(jour);
  }


  afficherTitulaires(ev: any) {
    this.sontTitulaires = ev;
    this.afficherResultats();
  }

  afficherRemplacants(ev: any) {
    this.sontRemplacants = ev;
    this.afficherResultats();
  }

  afficherRemplacantsConges(ev: any) {
    this.sontRemplacantsConges = ev;
    this.afficherResultats();
  }

  afficherResultats() {
    this.resultats = new Array<Vigile>();
    if (this.sontTitulaires) {
      const titulaires = this.vigiles.filter((vigile) => {
        return !vigile.estRemplacant && !vigile.estRemplacantConge;
      });
      this.resultats = this.resultats.concat(titulaires);

    }
    if (this.sontRemplacants) {
      const remplacants = this.vigiles.filter((vigile) => {
        return vigile.estRemplacant;
      });
      this.resultats = this.resultats.concat(remplacants);
    }
    if (this.sontRemplacantsConges) {
      const remplacantsConges = this.vigiles.filter((vigile) => {
        return vigile.estRemplacantConge;
      });
      this.resultats = this.resultats.concat(remplacantsConges);
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
