import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FrLanguage } from 'src/app/data/DATATABLES.LANGUAGE';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Ville } from 'src/app/models/ville.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-switch-list',
  templateUrl: './switch-list.component.html',
  styleUrls: ['./switch-list.component.scss']
})
export class SwitchListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  switchs = new Array<any>();
  resultats = new Array<any>();
  villes = new Array<Ville>();
  ville = null;

  constructor(
    private router: Router,
    private switchService: JarvisService<any>,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.switchService.getAll('switch').then((data) => {
      console.log('data');
      console.log(data);
      this.switchs = data;
      this.resultats = data;
      this.dtTrigger.next('');
    });
    this.switchService.getAll('ville').then((data) => {
      console.log('data');
      console.log(data);
      this.villes = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['switch', 'edit', id]);
  }

  filtrer(ville: Ville | null) {
    console.log(ville);
    console.log(this.dtElement);
    this.resultats = this.switchs;
    setTimeout(() => {
      if (ville) {
        this.resultats = this.resultats.filter((s) => {
          return s.idville && s.idville.idville === s.idville;
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
