import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-motif-list',
  templateUrl: './motif-list.component.html',
  styleUrls: ['./motif-list.component.scss']
})
export class MotifListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  motifs = new Array<any>();

  constructor(
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('motif').then((data) => {
      console.log('data');
      console.log(data);
      this.motifs = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
