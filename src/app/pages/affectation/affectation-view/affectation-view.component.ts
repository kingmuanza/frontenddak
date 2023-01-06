import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-affectation-view',
  templateUrl: './affectation-view.component.html',
  styleUrls: ['./affectation-view.component.scss']
})
export class AffectationViewComponent implements OnInit {

  affectation = new Affectation();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private affectationService: JarvisService<Affectation>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.affectationService.get('affectation', Number(id)).then((affectation) => {
          console.log('le affectation recupéré');
          console.log(affectation);
          this.affectation = affectation;
        });
      } else {
        this.affectation.dateAffectation = new Date().toISOString().split('T')[0];
      }
    });
  }

  arreter() {
    console.log(this.affectation);
    this.affectationService.modifier('affectation', this.affectation.idaffectation, this.affectation).then(() => {
      this.notifierService.notify('success', "Affectation mise en arrêt avec succès");
        this.router.navigate(['affectation']);
    });
  }

  jourSemaine(jour: number | string) {
    return this.affectationService.jourSemaine(Number(jour))
  }

}
