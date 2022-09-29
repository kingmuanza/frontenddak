import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from 'src/app/models/contrat.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-contrat-view',
  templateUrl: './contrat-view.component.html',
  styleUrls: ['./contrat-view.component.scss']
})
export class ContratViewComponent implements OnInit {

  contrat = new Contrat();
  avenants = new Array<any>();

  contrats = new Array<Contrat>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratService: JarvisService<Contrat>,
    private avenantService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getContrat(id).then((contrat) => {
          this.contrat = contrat;
          
          this.contratService.getAll('contrat').then((data) => {
            console.log('data');
            console.log(data);
            this.contrats = data.filter((contrat) => {
              return contrat.idparent && contrat.idparent.idcontrat === this.contrat.idcontrat;
            });
          });
        });
      }
    });
  }

  getContrat(id: string): Promise<Contrat> {
    return new Promise((resolve, reject) => {
      this.contratService.get('contrat', Number(id)).then((contrat) => {
        console.log('contrat');
        console.log(contrat);
        resolve(contrat);
      });
    });
  }

  getAvenants(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.avenantService.getAll('contratavenant').then((avenants) => {
        console.log('avenants');
        console.log(avenants);
        resolve(avenants);
      });
    });
  }
}
