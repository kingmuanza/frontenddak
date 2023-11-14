import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { VigileCtrlService } from 'src/app/_services/vigile-ctrl-service';
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
    private jarvisService: JarvisService<any>,
    private vigileCtrlService: VigileCtrlService
  ) { }

  ngOnInit(): void {
    this.vigileCtrlService.getVigilesVacants().then((vigiles) => {
      this.vigiles = vigiles;
      this.dtTrigger.next("");
    });
  }

  ngOnDestroy(): void {

  }

}
