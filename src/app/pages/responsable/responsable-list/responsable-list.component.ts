import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Responsable } from 'src/app/models/responsable.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-responsable-list',
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.scss']
})
export class ResponsableListComponent implements OnInit {

  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  responsables = new Array<Responsable>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Responsable>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('responsable').then((data) => {
      console.log('data');
      console.log(data);
      this.responsables = data;
      this.dtTrigger.next('');
    });
  }

  edit(responsable: Responsable) {
    this.router.navigate(['responsable', 'edit', responsable.idresponsable]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
