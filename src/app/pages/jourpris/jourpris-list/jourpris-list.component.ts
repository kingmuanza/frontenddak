import { JourPris } from './../../../models/jourpris.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Vigile } from 'src/app/models/vigile.model';
import { Ville } from 'src/app/models/ville.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-jourpris-list',
  templateUrl: './jourpris-list.component.html',
  styleUrls: ['./jourpris-list.component.scss']
})
export class JourprisListComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  jourpriss = new Array<JourPris>();
  resultats = new Array<JourPris>();
  villes = new Array<Ville>();
  ville = null;
  aujourdhui: Date | undefined;

  consommation = "tous";


  constructor(
    private router: Router,
    private jourprisService: JarvisService<JourPris>,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.jourprisService.getAll('jourpris').then((data) => {
      console.log('data');
      console.log(data);
      this.jourpriss = data;
      this.resultats = data;
      this.dtTrigger.next('');
    });
  }



  edit(vigile: Vigile) {
    this.router.navigate(['vigile', 'view', vigile.idvigile]);
  }

  rechercher() {
    if (this.aujourdhui) {
      this.jourprisService.getAll('jourpris').then((data) => {
        console.log('data');
        console.log(data);
        this.jourpriss = data.filter((jourPris) => {
          let dateSuivi = new Date(jourPris.date);
          dateSuivi.setDate(dateSuivi.getDate() + 1)
          const jourSuivi = dateSuivi.toISOString().split("T")[0];
          const jour = new Date(this.aujourdhui!).toISOString().split("T")[0];
          const mmJour = jourSuivi == jour;
          console.log("dateSuivi", dateSuivi)
          console.log("jourSuivi", jourSuivi)
          console.log("jour", jour)
          console.log("mmJour", mmJour)
          return mmJour
        });
        this.resultats = this.jourpriss;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next('');
        });
      });
    } else {
      this.jourprisService.getAll('jourpris').then((data) => {
        console.log('data');
        console.log(data);
        this.jourpriss = data;
        this.resultats = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next('');
        });
      });

    }
  }

  afficher(event: any) {
    console.log("event", event);
    switch (event) {
      case "tous":
        this.resultats = this.jourpriss;
        break;

      case "consommees":
        this.resultats = this.jourpriss.filter((j) => j.consommee);
        break;

      case "nonconsommees":
        this.resultats = this.jourpriss.filter((j) => !j.consommee);
        break;

      default:
        break;
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
