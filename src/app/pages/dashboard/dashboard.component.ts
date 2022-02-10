import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones = new Array<any>();
  postes = new Array<any>();

  constructor(
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;
      this.jarvisService.getAll('poste').then((postes) => {
        console.log('data');
        console.log(postes);
        this.postes = postes;
      });
    });
  }

}
