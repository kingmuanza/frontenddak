import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Contrat } from 'src/app/models/contrat.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.scss']
})
export class ContratListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  contrats = new Array<Contrat>();
  resultatsPrimaires = new Array<Contrat>();
  resultats = new Array<Contrat>();
  afficher = 'CREATION';

  explication = {
    encours: "Contrats dont tous les sites et les exigences n'ont pas encore été crées",
    cree: "Contrats dont tous les sites et les exigences ont été crées mais pas les postes",
    parfait: "Contrats dont tous les sites, les exigences et les postes ont été crées",
  }

  nombres = {
    encours: 0,
    cree: 0,
    parfait: 0,
  }

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Contrat>,
    private contratCtrlService: ContratCtrlService,
  ) { }

  ngOnInit(): void {
    this.contratCtrlService.getContratsEnCoursDeCreation().then((data) => {
      console.log('data');
      console.log(data);
      this.nombres.encours = data.length
      this.contrats = data.filter((contrat) => {
        return !contrat.idparent;
      });
      this.resultats = data.filter((contrat) => {
        return !contrat.idparent;
      });
      this.dtTrigger.next('');
    });
  }

  afficherContrat(ev: any) {
    setTimeout(() => {
      console.log('afficherAffectationsEnCours');
      console.log(ev);
      this.resultats = new Array<Contrat>();
      if (this.afficher === 'CREATION') {
        this.contratCtrlService.getContratsEnCoursDeCreation().then((all) => {
          this.resultats = new Array<Contrat>();
          this.resultats = all;
          console.log(this.resultats.length);
          this.refreshDatatable();
          this.nombres.encours = all.length;
        });
      }
      if (this.afficher === 'CREE') {
        this.contratCtrlService.getContratsCrees().then((all) => {
          this.resultats = new Array<Contrat>();
          this.resultats = all;
          console.log(this.resultats.length);
          this.refreshDatatable();
          this.nombres.cree = all.length;
        });
      }
      if (this.afficher === 'PARFAIT') {
        this.contratCtrlService.getContratsParfaits().then((all) => {
          this.resultats = new Array<Contrat>();
          this.resultats = all;
          console.log(this.resultats.length);
          this.refreshDatatable();
          this.nombres.parfait = all.length;
        });
      }
      if (this.afficher === 'tous') {
        this.resultats = new Array<Contrat>();
        this.refreshDatatable();
      }
    }, 500);
  }

  public refreshDatatable() {
    try {
      console.log('début du rafraichissement');
      // this.dtTrigger = new Subject<any>();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // dtInstance.destroy();
        console.log('dtTrigger');
        console.log(this.resultats.length);
        // this.dtTrigger.next('');
        console.log('fin du rafraichissement');
      });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  edit(id: string | number) {
    this.router.navigate(['contrat', 'view', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

  libelleStatut(libelle: string): string {
    if (libelle === 'CREATION') {
      return 'En cours de création';
    }
    if (libelle === 'CREE') {
      return 'Créé';
    }
    return libelle;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
