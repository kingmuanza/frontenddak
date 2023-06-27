import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, map } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { LoadingService } from 'src/app/services/loading.service';
import { VigileService } from 'src/app/services/vigile.service';

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

  recherche = "";
  error = false;

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>,
    private vigileService: VigileService,
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

    let i = 0;
    setTimeout(() => {
      this.dtTrigger.next("");
    }, 500);
  }


  rechercher() {
    if (this.recherche.length > 2) {
      this.error = false;
      this.vigileService.rechercheCalme(this.recherche).then((vigiles) => {
        this.vigiles = vigiles;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next("");
        });
      });
    } else {
      this.error = true;
    }
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.vigileService.trier(this.sontTitulaires, this.sontRemplacants, this.sontRemplacantsConges).then((data) => {
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
