import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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
      pagingType: 'full_numbers',
      order:[[0, 'desc']] 
    };
  }

  edit(id: string) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  jourSemaine(jour: number) {
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
}
