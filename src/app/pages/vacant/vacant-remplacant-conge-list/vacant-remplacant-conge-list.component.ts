import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vacant-remplacant-conge-list',
  templateUrl: './vacant-remplacant-conge-list.component.html',
  styleUrls: ['./vacant-remplacant-conge-list.component.scss']
})
export class VacantRemplacantCongeListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<Vigile>();
  remplacantsConges = new Array<Vigile>();
  constructor(
    private router: Router,
    private vigileService: JarvisService<Vigile>
  ) { }

  ngOnInit(): void {
    this.vigiles = new Array<Vigile>();
    this.vigileService.getAll('vigile').then((vigiles) => {
      this.vigiles = vigiles;
      vigiles.forEach((v) => {
        if (v.estRemplacantConge) {
          this.remplacantsConges.push(v);
        }
      });
      this.dtTrigger.next('');
    });
  }

  getRemplacements(vigile: Vigile): Array<Vigile> {
    const remplacements = new Array<Vigile>();
    this.vigiles.forEach((v) => {
      if (v.idremplacantConge) {
        if (v.idremplacantConge.idvigile === vigile.idvigile) {
          remplacements.push(v);
        }
      }
    });
    return remplacements;
  }

  voir(vigile: Vigile) {
    this.router.navigate(['vacant','remplacant-conges', 'edit', vigile.idvigile]);
  }

  reorganiser() { }

  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
