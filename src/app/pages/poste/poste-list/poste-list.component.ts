import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss']
})
export class PosteListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  postes = new Array<any>();

  constructor(
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('poste').then((data) => {
      console.log('data');
      console.log(data);
      this.postes = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
