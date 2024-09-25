import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { ContratSite } from 'src/app/models/contrat.site.model';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss']
})
export class SiteViewComponent implements OnInit {

  site = new ContratSite()
  postes = new Array<Poste>();

  constructor(
    private jarvisService: JarvisService<ContratSite>,
    private router: Router,
    private route: ActivatedRoute,
    private posteCtrlService: PosteCtrlService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.jarvisService.get('contratsite', Number(id)).then((contratsite) => {
          console.log('contratsite');
          console.log(contratsite);
          this.site = contratsite;
          this.getPostes();
        });
      }
    });
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.posteCtrlService.getPostesOfContrat(this.site.idcontrat).then((postes) => {
        this.postes = postes.filter((p) => p.idcontratsite?.idcontratSite == this.site.idcontratSite);
      });
    });
  }
}
