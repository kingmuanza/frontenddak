import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { LoadingService } from 'src/app/services/loading.service';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-conge-list',
  templateUrl: './conge-list.component.html',
  styleUrls: ['./conge-list.component.scss']
})
export class CongeListComponent implements OnInit {

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

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>,
    private vigileService: VigileService,
    private authService: AuthService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {

    this.dtTrigger = this.vigileService.vigilesSubject;
    this.actualiser();
  }

  actualiser() {
    this.loadingService.afficher();
    this.vigileService.getAll().then((data) => {
      this.loadingService.cacher();
    });
  }

  actualiserDepuisLeServeur() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.loadingService.afficher();
      this.vigileService.getAllDepuisLeServeur().then((data) => {
        this.loadingService.cacher();
      });
    });
  }

  view(id: string | number) {
    this.router.navigate(['conge', 'view', id]);
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
