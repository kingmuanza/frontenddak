import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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
  afficher = 'encours';

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Contrat> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('contrat').then((data) => {
      console.log('data');
      console.log(data);
      this.contrats = data.filter((contrat) => {
        return !contrat.idparent;
      });
      this.resultatsPrimaires = data.filter((contrat) => {
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
        const contratsEnCours = this.resultatsPrimaires.filter((contrat) => {
          return contrat.statut === 'CREATION';
        });
        this.resultats = this.resultats.concat(contratsEnCours);
      }
      if (this.afficher === 'CREE') {
        const contratsEnCours = this.resultatsPrimaires.filter((contrat) => {
          return contrat.statut === 'CREE';
        });
        this.resultats = this.resultats.concat(contratsEnCours);
      }
      if (this.afficher === 'PARFAIT') {
        const contratsEnCours = this.resultatsPrimaires.filter((contrat) => {
          return  contrat.statut === 'PARFAIT';
        });
        this.resultats = this.resultats.concat(contratsEnCours);
      }
      if (this.afficher === 'tous') {
        const contratsEnCours = this.resultatsPrimaires.filter((contrat) => {
          return true;
        });
        this.resultats = this.resultats.concat(contratsEnCours);
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }, 500);
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
