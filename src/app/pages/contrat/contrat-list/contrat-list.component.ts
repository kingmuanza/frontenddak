import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ContratCtrlService } from 'src/app/_services/contrat-ctrl.service';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Contrat } from 'src/app/models/contrat.model';
import { AuthService } from 'src/app/services/auth.service';
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

  contratsEnCours = new Array<Contrat>();
  contratsCrees = new Array<Contrat>();
  contratsParfaits = new Array<Contrat>();
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

  mesDroits = droits;

  du: Date | undefined;
  au: Date | undefined;

  montrerErreurs = false;

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Contrat>,
    private contratCtrlService: ContratCtrlService,
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
    this.contratCtrlService.getContratsEnCoursDeCreation().then((data) => {
      console.log('data');
      console.log(data);
      this.nombres.encours = data.length;
      this.resultats = data;
      this.contratsEnCours = data;
      this.dtTrigger.next('');

      this.contratCtrlService.getContratsCrees().then((all) => {
        this.contratsCrees = all;
        this.nombres.cree = all.length;
      });
      this.contratCtrlService.getContratsParfaits().then((all) => {
        this.contratsParfaits = all;
        this.nombres.parfait = all.length;
      });
    });
  }

  init() {
    this.contratCtrlService.getContratsEnCoursDeCreation().then((data) => {
      console.log('data');
      console.log(data);
      this.nombres.encours = data.length;
      this.resultats = data;
      this.contratsEnCours = data;
      this.refreshDatatable();

      this.contratCtrlService.getContratsCrees().then((all) => {
        this.contratsCrees = all;
        this.nombres.cree = all.length;
      });
      this.contratCtrlService.getContratsParfaits().then((all) => {
        this.contratsParfaits = all;
        this.nombres.parfait = all.length;
      });
    });
  }

  afficherContrat(ev: any) {
    setTimeout(() => {
      console.log('afficherAffectationsEnCours');
      console.log(ev);
      this.resultats = new Array<Contrat>();
      if (this.afficher === 'CREATION') {
        this.resultats = this.contratsEnCours;
        this.refreshDatatable();
      }
      if (this.afficher === 'CREE') {
        this.resultats = this.contratsCrees;
        this.refreshDatatable();
      }
      if (this.afficher === 'PARFAIT') {
        this.resultats = this.contratsParfaits;
        this.refreshDatatable();
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
        dtInstance.destroy();
        console.log('dtTrigger');
        console.log(this.resultats.length);
        this.dtTrigger.next('');
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

  toDate(date: any) {
    if (date) {
      return new Date(date);
    } else {
      return new Date()
    }
  }

  rechercher() {
    if (this.au && this.du) {
      this.montrerErreurs = false;
      this.resultats = this.contrats.filter((contrat) => {
        return new Date(contrat.date).getTime() <= new Date(this.au!).getTime() && new Date(contrat.date).getTime() >= new Date(this.du!).getTime()
      })
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next("");
      });
    } else {
      this.montrerErreurs = true;
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
