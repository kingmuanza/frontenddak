import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Contrat } from 'src/app/models/contrat.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.scss']
})
export class ContratListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  contrats = new Array<Contrat>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Contrat> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('contrat').then((data) => {
      console.log('data');
      console.log(data);
      this.contrats = data.filter((contrat) => {
        return !contrat.idparent;
      });
      this.dtTrigger.next('');
    });
  }

  edit(id: string | number) {
    this.router.navigate(['contrat', 'view', id]);
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
