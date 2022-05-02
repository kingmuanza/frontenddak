import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Ville } from 'src/app/models/ville.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-ville-list',
  templateUrl: './ville-list.component.html',
  styleUrls: ['./ville-list.component.scss']
})
export class VilleListComponent implements OnInit, OnDestroy {

  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  villes = new Array<Ville>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Ville> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('ville').then((data) => {
      console.log('data');
      console.log(data);
      this.villes = data;
      this.dtTrigger.next('');
    });
  }

  edit(ville: Ville) {
    this.router.navigate(['ville', 'edit', ville.idville]);
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
