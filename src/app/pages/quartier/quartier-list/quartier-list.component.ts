import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Quartier } from 'src/app/models/quartier.model';
import { Ville } from 'src/app/models/ville.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-quartier-list',
  templateUrl: './quartier-list.component.html',
  styleUrls: ['./quartier-list.component.scss']
})
export class QuartierListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  quartiers = new Array<Quartier>();
  resultats = new Array<Quartier>();
  zones = new Array<ZoneDak>();
  zone = null;
  constructor(
    private jarvisService: JarvisService<Quartier>,
    private zoneService: JarvisService<ZoneDak>,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.zoneService.getAll('zone').then((data) => {
      console.log('zones');
      console.log(data);
      this.zones = data;
    });
    this.jarvisService.getAll('quartier').then((data) => {
      console.log('quartiers');
      console.log(data);
      this.quartiers = data;
      this.resultats = data;
      this.dtTrigger.next('');
    });
  }
  
  edit(id: number | string) {
    this.router.navigate(['quartier', 'edit', id]);
  }

  filtrer(zone: ZoneDak | null) {
    console.log(zone);
    console.log(this.dtElement);
    this.resultats = this.quartiers;
    setTimeout(() => {
      if (zone) {
        this.resultats = this.resultats.filter((quartier) => {
          return quartier.idzone && quartier.idzone.idzone === zone.idzone;
        });
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next('');
        });
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
