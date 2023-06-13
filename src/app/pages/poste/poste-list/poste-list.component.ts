import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-poste-list',
  templateUrl: './poste-list.component.html',
  styleUrls: ['./poste-list.component.scss']
})
export class PosteListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  postes = new Array<Poste>();
  resultatsPrimaires = new Array<Poste>();
  resultats = new Array<Poste>();

  zones = new Array<ZoneDak>();
  zone = new ZoneDak();
  horaire = 'tous';
  affectations = new Array<Affectation>();
  afficher = 'tous';

  vacanteur: any = {};

  libelle = "Liste des postes récemment créés";

  mesDroits = droits;

  constructor(
    private router: Router,
    private posteService: JarvisService<Poste>,
    private zoneService: JarvisService<ZoneDak>,
    private affectationService: JarvisService<Affectation>,
    private posteCtrlService: PosteCtrlService,
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
    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;

      this.affectationService.getAll('affectation').then((affectations) => {
        console.log('affectations');
        console.log(affectations);
        this.affectations = affectations;

        this.posteCtrlService.getLasts().then((data) => {
          console.log('data');
          console.log(data);
          this.postes = data;
          this.resultatsPrimaires = data;
          this.resultats = data;
          this.dtTrigger.next('');
        });

      });
    });
  }

  rechercher(horaire: string, zone?: ZoneDak) {
    this.libelle = "Résultats de la recherche";
    this.resultatsPrimaires = new Array<Poste>();
    if (zone) {
      this.posteCtrlService.getPostesByZone(zone).then((postes) => {
        this.resultatsPrimaires = postes;
        this.afficherPostes(this.afficher);
      });
    }
  }

  afficherPostes(afficher?: string) {
    setTimeout(() => {
      this.resultats = new Array<Poste>();
      if (afficher === 'parfait') {
        const postes = this.resultatsPrimaires.filter((poste) => {
          return this.vacanteur[poste.idposte];
        });
        this.resultats = this.resultats.concat(postes);
      }
      if (afficher === 'vacant') {
        const postes = this.resultatsPrimaires.filter((poste) => {
          return !this.vacanteur[poste.idposte];
        });
        this.resultats = this.resultats.concat(postes);
      }
      if (afficher === 'tous') {
        const postes = this.resultatsPrimaires.filter((poste) => {
          return true;
        });
        this.resultats = this.resultats.concat(postes);
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }, 500);
  }

  initZone() {
    this.zone = new ZoneDak();
  }

  edit(id: string | number) {
    this.router.navigate(['poste', 'view', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

  isNotVacant(poste: Poste, is: boolean) {

    this.vacanteur[poste.idposte] = is

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
