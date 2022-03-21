import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-quartier-list',
  templateUrl: './quartier-list.component.html',
  styleUrls: ['./quartier-list.component.scss']
})
export class QuartierListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  quartiers = new Array<any>();

  constructor(
    private jarvisService: JarvisService<any>,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('quartier').then((data) => {
      console.log('data');
      console.log(data);
      this.quartiers = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  
  edit(id: string) {
    this.router.navigate(['quartier', 'edit', id]);
  }


}
