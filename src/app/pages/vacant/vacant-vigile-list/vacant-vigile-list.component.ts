import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vacant-vigile-list',
  templateUrl: './vacant-vigile-list.component.html',
  styleUrls: ['./vacant-vigile-list.component.scss']
})
export class VacantVigileListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<any>();
  affectations = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      this.vigiles = [];
      data.forEach((vigile) => {
        if (!vigile.estRemplacant) {
          this.vigiles.push(vigile);
        }
      });
      this.getAffectations().then(() => {
        this.dtTrigger.next('');
      });
    });
  }

  getNombreAffectation(vigile: Vigile) {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idvigile.idvigile === vigile.idvigile && !affectation.arret) {
        if (true) {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations;
  }
  
  getNombreAffectationJour(vigile: Vigile) {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idvigile.idvigile === vigile.idvigile && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'jour') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations;
  }

  getNombreAffectationNuit(vigile: Vigile) {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idvigile.idvigile === vigile.idvigile && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'nuit') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations;
  }

  getAffectations(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        this.affectations = data;
        resolve();
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['vigile', 'edit', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
