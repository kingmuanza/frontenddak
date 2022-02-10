import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';
import { PointageService } from 'src/app/services/pointage.service';

@Component({
  selector: 'app-pointage-list',
  templateUrl: './pointage-list.component.html',
  styleUrls: ['./pointage-list.component.scss']
})
export class PointageListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  suiviPostes = new Array<any>();
  zones = new Array<any>();
  vigiles = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>
  ) { }
  ngOnInit(): void {
    this.jarvisService.getAll('vigile').then((data2) => {
      console.log('data');
      console.log(data2);
      this.vigiles = data2;
      this.jarvisService.getAll('zone').then((data1) => {
        console.log('data');
        console.log(data1);
        this.zones = data1;
  
        this.jarvisService.getAll('suiviposte').then((data) => {
          console.log('data');
          console.log(data);
          this.suiviPostes = data;
          this.dtTrigger.next('');
        });
      });
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  getZone(id: number) {
    let zone: any;
    this.zones.forEach((z)=>{
      if (z.idzone == id) {
        zone = z;
      }
    });
    return zone;
  }

  getVigile(numero: string) {
    let vigile: any;
    this.vigiles.forEach((v)=>{
      if (v.numero == numero) {
        vigile = v;
      }
    });
    return vigile;
  }

  edit(id: string) {
    this.router.navigate(['zone', 'edit', id]);
  }

  ngOnDestroy(): void {

  }

}
