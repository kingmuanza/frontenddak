import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Permission } from 'src/app/models/permission.model';
import { JarvisService } from 'src/app/services/jarvis.service';


@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  permissions = new Array<Permission>();

  constructor(
    private router: Router,
    private permissionService: JarvisService<Permission> 
  ) { }

  ngOnInit(): void {
    this.permissionService.getAll('permission').then((data) => {
      console.log('data');
      console.log(data);
      this.permissions = data;
      this.dtTrigger.next('');
    });
  }

  edit(id: string | number) {
    this.router.navigate(['permission', 'edit', id]);
  }

  jourSemaine(jour: any) {
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
