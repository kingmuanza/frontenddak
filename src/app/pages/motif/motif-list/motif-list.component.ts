import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-motif-list',
  templateUrl: './motif-list.component.html',
  styleUrls: ['./motif-list.component.scss']
})
export class MotifListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  motifs = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('motif').then((data) => {
      console.log('data');
      console.log(data);
      this.motifs = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: number) {
    this.router.navigate(['motif', 'edit', id]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
