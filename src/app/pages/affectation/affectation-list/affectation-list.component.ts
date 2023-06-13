import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Affectation } from 'src/app/models/affectation.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-affectation-list',
  templateUrl: './affectation-list.component.html',
  styleUrls: ['./affectation-list.component.scss']
})
export class AffectationListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  affectations = new Array<Affectation>();
  resultats = new Array<Affectation>();
  resultatsPrimaires = new Array<Affectation>();

  afficher = 'encours';
  horaire = 'jour';

  mesDroits = droits;

  constructor(
    private router: Router,
    private affectationService: JarvisService<any>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur) {
        try {
          this.mesDroits = JSON.parse(utilisateur.droits);
        } catch (error) {
          this.mesDroits = droits;
        }
      }

    });
    this.authService.notifier();
    this.affectationService.getAll('affectation').then((data) => {
      console.log('data');
      console.log(data);
      this.affectations = data;
      this.resultats = data;
      this.resultatsPrimaires = data;
      this.afficherAffectationsEnCours(this.afficher);
      this.dtTrigger.next('');
    });
  }

  edit(id: string | number) {
    this.router.navigate(['affectation', 'view', id]);
  }

  jourSemaine(jour: number) {
    return this.affectationService.jourSemaine(jour);
  }

  rechercher(horaire: string) {
    this.resultatsPrimaires = new Array<Affectation>();
    if (horaire === 'tous') {
      const affectationsHoraire = this.affectations.filter((affectation) => {
        return true;
      });
      this.resultatsPrimaires = this.resultatsPrimaires.concat(affectationsHoraire);
    } else {
      const affectationsHoraire = this.affectations.filter((affectation) => {
        return affectation.horaire === horaire;
      });
      this.resultatsPrimaires = this.resultatsPrimaires.concat(affectationsHoraire);
    }
    this.afficherAffectationsEnCours(this.afficher);
  }

  afficherAffectationsEnCours(ev: any) {
    setTimeout(() => {
      console.log('afficherAffectationsEnCours');
      console.log(ev);
      this.resultats = new Array<Affectation>();
      if (this.afficher === 'encours') {
        const affectationsEnCours = this.resultatsPrimaires.filter((affectation) => {
          return !affectation.arret;
        });
        this.resultats = this.resultats.concat(affectationsEnCours);
      }
      if (this.afficher === 'arret') {
        const affectationsEnCours = this.resultatsPrimaires.filter((affectation) => {
          return affectation.arret;
        });
        this.resultats = this.resultats.concat(affectationsEnCours);
      }
      if (this.afficher === 'tous') {
        const affectationsEnCours = this.resultatsPrimaires.filter((affectation) => {
          return true;
        });
        this.resultats = this.resultats.concat(affectationsEnCours);
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }, 500);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
