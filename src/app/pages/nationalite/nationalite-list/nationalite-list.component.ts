import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-nationalite-list',
  templateUrl: './nationalite-list.component.html',
  styleUrls: ['./nationalite-list.component.scss']
})
export class NationaliteListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  nationalites = new Array<any>();

  constructor(
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('nationalite').then((data) => {
      console.log('data');
      console.log(data);
      this.nationalites = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
