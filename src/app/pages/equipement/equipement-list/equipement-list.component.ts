import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Ville } from 'src/app/models/ville.model';
import { Equipement } from 'src/app/models/equipement.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-equipement-list',
  templateUrl: './equipement-list.component.html',
  styleUrls: ['./equipement-list.component.scss']
})
export class EquipementListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  equipements = new Array<Equipement>();
  resultats = new Array<Equipement>();
  villes = new Array<Ville>();
  ville = null;

  constructor(
    private router: Router,
    private equipementService: JarvisService<Equipement>,
    private villeService: JarvisService<Ville>,
  ) { }

  ngOnInit(): void {
    this.equipementService.getAll('equipement').then((data) => {
      console.log('data');
      console.log(data);
      this.equipements = data;
      this.resultats = data;
      this.dtTrigger.next('');
    });
    this.villeService.getAll('ville').then((data) => {
      console.log('data');
      console.log(data);
      this.villes = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['equipement', 'edit', id]);
  }

  filtrer(ville: Ville | null) {
    console.log(ville);
    console.log(this.dtElement);
    this.resultats = this.equipements;
    setTimeout(() => {
      
    }, 500);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
