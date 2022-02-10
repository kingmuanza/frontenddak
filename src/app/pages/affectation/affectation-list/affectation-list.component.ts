import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-affectation-list',
  templateUrl: './affectation-list.component.html',
  styleUrls: ['./affectation-list.component.scss']
})
export class AffectationListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  affectations = new Array<any>();

  constructor(
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('affectation').then((data) => {
      console.log('data');
      console.log(data);
      this.affectations = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
