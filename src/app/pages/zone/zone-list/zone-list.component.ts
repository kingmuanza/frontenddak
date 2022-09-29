import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FrLanguage } from 'src/app/data/DATATABLES.LANGUAGE';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Ville } from 'src/app/models/ville.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  zones = new Array<ZoneDak>();
  resultats = new Array<ZoneDak>();
  villes = new Array<Ville>();
  ville = null;

  constructor(
    private router: Router,
    private zoneService: JarvisService<ZoneDak>,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.zoneService.getAll('zone').then((data) => {
      console.log('data');
      console.log(data);
      this.zones = data;
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
    this.router.navigate(['zone', 'edit', id]);
  }

  filtrer(ville: Ville | null) {
    console.log(ville);
    console.log(this.dtElement);
    this.resultats = this.zones;
    setTimeout(() => {
      if (ville) {
        this.resultats = this.resultats.filter((zone) => {
          return zone.idville && zone.idville.idville === ville.idville;
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
