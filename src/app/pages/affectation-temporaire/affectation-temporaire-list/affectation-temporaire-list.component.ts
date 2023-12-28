import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Affectation } from 'src/app/models/affectation.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-affectation-temporaire-list',
  templateUrl: './affectation-temporaire-list.component.html',
  styleUrls: ['./affectation-temporaire-list.component.scss']
})
export class AffectationTemporaireListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  affectations = new Array<Affectation>();
  resultats = new Array<Affectation>();
  resultatsPrimaires = new Array<Affectation>();
  zones = new Array<ZoneDak>();
  zone = new ZoneDak();

  afficher = 'tous';
  horaire = 'jour';

  mesDroits = droits;

  constructor(
    private router: Router,
    private affectationService: JarvisService<any>,
    private authService: AuthService,
    private zoneService: JarvisService<ZoneDak>,
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
    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;
    });


    this.authService.notifier();
    this.affectationService.getAll('affectation').then((data) => {
      console.log('data');
      console.log(data);
      this.affectations = data.filter((aff) => aff.placement);
      this.resultats = data.filter((aff) => aff.placement);
      this.resultatsPrimaires = data.filter((aff) => aff.placement);
      // this.afficherAffectationsEnCours(this.afficher);
      this.dtTrigger.next('');
    });
  }

  edit(id: string | number) {
    this.router.navigate(['affectation', 'view', id]);
  }

  jourSemaine(jour: number | string) {
    return this.affectationService.jourSemaine(jour);
  }

  rechercher(horaire: string) {
    this.afficherAffectationZones();
    this.afficherAffectationsEnCours(this.afficher);
  }

  encours(): Affectation[] {
    return this.resultats.filter((aff) => {
      return !aff.arret
    })
  }

  sansRemplacants(): Affectation[] {
    return this.resultats.filter((aff) => {
      return !aff.remplacant
    })
  }

  sansJourRepos(): Affectation[] {
    return this.resultats.filter((aff) => {
      return !aff.jourRepos
    })
  }

  afficherAffectationsEnCours(ev: any) {

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

    console.log("this.resultats.length", this.resultats.length);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next('');
      console.log("this.resultats.length 2 ! ", this.resultats.length);
    });
  }

  afficherAffectationZones() {

    console.log('afficherAffectationZones');
    console.log(this.zone);
    this.resultats = new Array<Affectation>();
    this.resultatsPrimaires = this.affectations.filter((affectation) => {
      return affectation.idposte?.zone.code === this.zone.code;
    });
    console.log("this.resultatsPrimaires.length", this.resultatsPrimaires.length);

  }

  mettreToutEnLigne() {
    this.router.navigate(["upload-affectation"]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
