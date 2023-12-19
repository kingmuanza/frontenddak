import { JourPris } from './../../../models/jourpris.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Ville } from 'src/app/models/ville.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-jourpris-list',
  templateUrl: './jourpris-list.component.html',
  styleUrls: ['./jourpris-list.component.scss']
})
export class JourprisListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  jourpriss = new Array<JourPris>();
  resultats = new Array<JourPris>();
  villes = new Array<Ville>();
  ville = null;

  constructor(
    private router: Router,
    private jourprisService: JarvisService<JourPris>,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.jourprisService.getAll('jourpris').then((data) => {
      console.log('data');
      console.log(data);
      this.jourpriss = data;
      this.resultats = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: number) {
    this.router.navigate(['jourpris', 'edit', id]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
