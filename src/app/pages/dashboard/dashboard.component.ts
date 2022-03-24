import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones = new Array<ZoneDak>();
  postes = new Array<Poste>();
  vigiles = new Array<Vigile>();

  nbVigilesJour = 0;
  nbVigilesNuit = 0;

  nbBesoinVigilesJour = 0;
  nbBesoinVigilesNuit = 0;

  terminee = false;

  constructor(
    private router: Router,
    private zoneService: JarvisService<ZoneDak>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
  ) { }

  ngOnInit(): void {
    this.getVigiles().then(() => {
      this.zoneService.getAll('zone').then((zones) => {
        console.log('data');
        console.log(zones);
        this.zones = zones;
        this.posteService.getAll('poste').then((postes) => {
          console.log('data');
          console.log(postes);
          this.postes = postes;
          postes.forEach((poste) => {
            if (poste.nombreVigileJour) {
              this.nbBesoinVigilesJour += poste.nombreVigileJour;
            }
            if (poste.nombreVigileNuit) {
              this.nbBesoinVigilesNuit += poste.nombreVigileNuit;
            }
            this.terminee = true;
          });
        });
      });
    });
  }

  getVigiles(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((vigiles) => {
        console.log('vigiles');
        console.log(vigiles);
        this.vigiles = vigiles;
        vigiles.forEach((vigile) => {
          if (!vigile.estRemplacant) {
            if (vigile.horaire === 'jour') {
              this.nbVigilesJour += 1;
            }
            if (vigile.horaire === 'nuit') {
              this.nbVigilesNuit += 1;
            }
          }
        });
        resolve();
      });
    });
  }

  goToPostesVacants() {
    this.router.navigate(['vacant', 'poste']);
  }

  goToZone(zone: ZoneDak) {
    this.router.navigate(['fiche', 'planning-incomplet', zone.idzone]);
  }

}
