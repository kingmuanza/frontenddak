import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-nationalite-list',
  templateUrl: './nationalite-list.component.html',
  styleUrls: ['./nationalite-list.component.scss']
})
export class NationaliteListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  nationalites = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('nationalite').then((data) => {
      console.log('data');
      console.log(data);
      this.nationalites = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: number) {
    this.router.navigate(['nationalite', 'edit', id]);
  }

}
