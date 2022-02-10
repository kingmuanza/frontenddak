import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  zones = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('zone').then((data) => {
      console.log('data');
      console.log(data);
      this.zones = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  edit(id: string) {
    this.router.navigate(['zone', 'edit', id]);
  }

}
