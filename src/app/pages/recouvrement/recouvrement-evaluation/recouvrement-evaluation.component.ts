import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-recouvrement-evaluation',
  templateUrl: './recouvrement-evaluation.component.html',
  styleUrls: ['./recouvrement-evaluation.component.scss']
})
export class RecouvrementEvaluationComponent implements OnInit {

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
    { data: this.semaines, label: 'Montant recouvré', backgroundColor: '#E3B505' },
  ];

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>) { }

  ngOnInit(): void {
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);

      data.forEach((vigile) => {
        if (vigile.jourRepos) {
          if (vigile.jourRepos > 1) {
            this.semaines[vigile.jourRepos - 1] += 1;
          }
        }
      });
      console.log('this.semaines');
      console.log(this.semaines);
      // this.afficher = true;
    });
  }

}
