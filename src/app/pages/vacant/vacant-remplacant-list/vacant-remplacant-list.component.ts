import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-vacant-remplacant-list',
  templateUrl: './vacant-remplacant-list.component.html',
  styleUrls: ['./vacant-remplacant-list.component.scss']
})
export class VacantRemplacantListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<any>();
  vigilesPropositions = new Array<any>();
  affectations = new Array<any>();
  affectationsPropositions = new Array<any>();

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
        if (vigile.estRemplacant) {
          const v = new Vigile();
          v.copy(vigile);
          this.vigiles.push(v);
        }
      });
      this.getAffectations().then(() => {
        this.dtTrigger.next('');
      });
    });
  }

  reorganiser() {
    this.openModal();
    console.log('reorganiser');
    const vigiles = this.vigiles.concat([]);
    this.vigilesPropositions = new Array<any>();
    vigiles.forEach((vigile) => {
      if (vigile.estRemplacant) {
        const v = new Vigile();
        v.copy(vigile);
        this.vigilesPropositions.push(v);
      }
    });
    const postes = this.affectations.concat([]);
  }

  openModal() {
    
    console.log('open modal suggestion');
    const modale = document.getElementById('suggestion');
    
    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  getAffectationJour(vigile: Vigile, jour: number): Affectation {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.remplacant.idvigile === vigile.idvigile && !affectation.arret) {
        if (affectation.idvigile.jourRepos === jour) {
          dernieresAffectations.push(affectation);
        }
      }
    });
    if (dernieresAffectations.length > 0) {
      return dernieresAffectations[0];
    } else {
      return new Affectation();
    }
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
