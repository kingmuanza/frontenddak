import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-repos-graphe',
  templateUrl: './repos-graphe.component.html',
  styleUrls: ['./repos-graphe.component.scss']
})
export class ReposGrapheComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  vigiles = new Array<any>();

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  public barChartType = 'bar';
  public barChartLegend = true;

  semaines = [0, 0, 0, 0, 0, 0, 0];
  afficher = false;

  public barChartData = [
    { data: this.semaines, label: 'Jours de repos' },
  ];

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      this.vigiles = data;
      this.vigiles.forEach((vigile) => {
        if (vigile.jourRepos) {
          if (vigile.jourRepos > 1) {
            this.semaines[vigile.jourRepos - 1] += 1;
          }
        }
      });
      console.log('this.semaines');
      console.log(this.semaines);
      this.afficher = true;
      this.dtTrigger.next('');
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
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
