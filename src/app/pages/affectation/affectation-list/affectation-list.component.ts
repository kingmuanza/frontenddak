import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-affectation-list',
  templateUrl: './affectation-list.component.html',
  styleUrls: ['./affectation-list.component.scss']
})
export class AffectationListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  affectations = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('affectation').then((data) => {
      console.log('data');
      console.log(data);
      this.affectations = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: string) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  jourSemaine(jour: number) {
    if (jour == 1)
    return "Lundi";
    if (jour == 2)
    return "Mardi";
    if (jour == 3)
    return "Mercredi";
    if (jour == 4)
    return "Jeudi";
    if (jour == 5)
    return "Vendredi";
    if (jour == 6)
    return "Samedi";
    if (jour == 7)
    return "Dimanche";

    return "" + jour ? jour: "";
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
