import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss']
})
export class PosteListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  postes = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('poste').then((data) => {
      console.log('data');
      console.log(data);
      this.postes = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: string) {
    this.router.navigate(['poste', 'view', id]);
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
