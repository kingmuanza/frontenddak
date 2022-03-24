import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vigile-list',
  templateUrl: './vigile-list.component.html',
  styleUrls: ['./vigile-list.component.scss']
})
export class VigileListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  vigiles = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      this.vigiles = data;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      order:[[0, 'desc']] 
    };
  }

  edit(id: string) {
    this.router.navigate(['vigile', 'edit', id]);
  }

  libelleFonction(fonction: string) {
    if (fonction == "AGENT")
    return "Agent de sécurité";
    if (fonction == "ESCORTEUR")
    return "Escorteur";
    if (fonction == "CONTROLEUR")
    return "Contrôleur";
    if (fonction == "CHAUFFEUR")
    return "Chauffeur";
    if (fonction == "MAITRECHIEN")
    return "Maitre Chien";

    return "";
  }

  libelleStatut(jour: number) {
    if (jour == 1)
    return "Absent[e]";
    if (jour == 2)
    return "Actif[ve]";
    if (jour == 3)
    return "Licencié(e)";
    if (jour == 4)
    return "Standby";
    if (jour == 5)
    return "Suspendu[e]";
    if (jour == 6)
    return "Démissionné[e]";
    if (jour == 7)
    return "Décédé[e]";

    return "" + jour ? jour: "";
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

    return "" + jour ? jour : "";
  }


  
}
