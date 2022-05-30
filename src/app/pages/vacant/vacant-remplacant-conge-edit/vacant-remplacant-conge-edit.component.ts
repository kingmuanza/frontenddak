import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vacant-remplacant-conge-edit',
  templateUrl: './vacant-remplacant-conge-edit.component.html',
  styleUrls: ['./vacant-remplacant-conge-edit.component.scss']
})
export class VacantRemplacantCongeEditComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<Vigile>();
  remplaces = new Array<Vigile>();
  vigile = new Vigile();
  remplacantsConges = new Array<Vigile>();

  dates = new Array();
  datesTravail = new Array<Date>();

  annee = 2022;
  constructor(
    private vigileService: JarvisService<Vigile>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.creerTousLesMoisDeLAnnee();
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.vigileService.get('vigile', Number(id)).then((vigile) => {
          this.vigile = vigile;
          this.vigiles = new Array<Vigile>();
          this.vigileService.getAll('vigile').then((vigiles) => {
            this.vigiles = vigiles;
            vigiles.forEach((v) => {
              if (v.estRemplacantConge) {
                this.remplacantsConges.push(v);
              }
            });
            this.remplaces = this.getRemplacements(vigile);
            this.joursOuIlEstOccupee();
            this.dtTrigger.next('');
          });
        });
      }
    });
  }

  creerTousLesMoisDeLAnnee() {
    const maintenant = new Date();
    const annee = maintenant.getFullYear();
    const premierJanvier = new Date(annee + '-01-01');
    this.dates = new Array();
    for (let index = 1; index < 10; index++) {
      this.dates.push(new Date(annee + '-0' + index + '-01'));
    }
    for (let index = 10; index < 13; index++) {
      this.dates.push(new Date(annee + '-' + index + '-01'));
    }
    console.log(this.dates);
  }

  getTousLesJoursdUnMois(premierJour: Date): Array<Date> {
    const jours = new Array<Date>();
    const mois = premierJour.getMonth();
    let jour = new Date(premierJour);
    while(mois === jour.getMonth()) {
      jours.push(new Date(jour));
      jour.setDate(jour.getDate() + 1);
    }
    return jours;
  }

  getRemplacements(vigile: Vigile): Array<Vigile> {
    const remplacements = new Array<Vigile>();
    this.vigiles.forEach((v) => {
      if (v.idremplacantConge) {
        if (v.idremplacantConge.idvigile === vigile.idvigile) {
          remplacements.push(v);
        }
      }
    });
    return remplacements;
  }

  estUnJourOccupee(jour: Date): boolean {
    let resultat = false;
    this.datesTravail.forEach((d) => {
      if (d.toISOString().split('T')[0]  === jour.toISOString().split('T')[0]) {
        resultat = true;
      }
    });
    return resultat;
  }

  joursOuIlEstOccupee() {
    const jours = new Array<Date>();
    this.remplaces.forEach((v) => {
      if (v.debutConge && v.finConge) {
        let debutConge = new Date(v.debutConge);
        let finConge = new Date(v.finConge);
        let jour = new Date(v.debutConge);
        jour.setFullYear(new Date().getFullYear());
        finConge.setFullYear(new Date().getFullYear());
        while(finConge.getTime() > jour.getTime() ) {
          jours.push(new Date(jour));
          jour.setDate(jour.getDate() + 1);
        }
      }
    });
    console.log("jours");
    console.log(jours);
    this.datesTravail = jours;
  }

  reorganiser() { }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
