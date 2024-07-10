import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.dtOptions.processing = true;
    this.dtOptions.serverSide = true;
    this.dtOptions = {
      processing: true,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback: any) => {
        let start = Number(dataTablesParameters.start)
        let end = start + 10
        let search = dataTablesParameters.search;
        let recherche = search.value;
        console.log("search", search)
        console.log("recherche", recherche)
        if (recherche.length > 1) {
          let resultats = this.zones.filter((z) => {
            return JSON.stringify(z).toLowerCase().indexOf(recherche.toLowerCase()) != -1 && z.idzone
          })
          callback({
            recordsTotal: resultats.length,
            recordsFiltered: resultats.length,
            data: resultats
          });
        } else {

          this.http.get('http://localhost:8080/dakBack/webresources/zone/' + start + "/" + end, dataTablesParameters).subscribe({
            next: (data: any) => {
              if (data) {
                let resp = data.slice(0, 10)
                console.log("response du serveur", resp)
                console.log("dataTablesParameters", dataTablesParameters)
                this.zones = [this.zones, ...resp];
                callback({
                  recordsTotal: 21,
                  recordsFiltered: 21,
                  data: resp
                });
              }
            },
            error: (e) => {
              console.log(e)
            }
          })
        }
      },
      columns: [
        { data: 'idzone' },
        { data: 'code' },
        { data: 'libelle' },
        { data: 'horaire' },
        { data: 'idville.libelle' }
      ],
      pagingType: 'simple',
      pageLength: 10,
      lengthChange: false
    };
    /* setTimeout(() => {
      this.villeService.getAll('ville').then((data) => {
        console.log('data');
        console.log(data);
        this.villes = data;
      });
      this.zoneService.getAll('zone').then((data) => {
        console.log('data');
        console.log(data);
        this.zones = data;
        this.resultats = data;
        this.dtOptions.processing = false;
      });
    }, 5000); */
  }
  ngAfterViewInit(): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      dtInstance.on('click', 'tr', (event: any) => {
        const rowData = dtInstance.row(event.currentTarget).data();
        console.log("rowData");
        console.log(rowData);
        this.edit(rowData);
      });
    })
  }

  edit(zone: ZoneDak) {
    this.router.navigate(['zone', 'edit', zone.idzone]);
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
