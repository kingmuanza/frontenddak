import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { CalculService } from 'src/app/services/calcul.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { BesoinVigile } from 'src/app/structures/besoin.vigile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones = new Array<ZoneDak>();
  postes = new Array<Poste>();
  vigiles = new Array<Vigile>();

  besoinVigile = new BesoinVigile();

  terminee = false;

  constructor(
    private router: Router,
    private calculService: CalculService,
    private zoneService: JarvisService<ZoneDak>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
  ) { }

  ngOnInit(): void {
    this.calculService.getBesoinVigiles().then((besoinVigile) => {
      this.besoinVigile = besoinVigile;
      this.terminee = true;
    });

    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;
    });
  }

  groupByVille() {
    
  }


  goToPostesVacants() {
    this.router.navigate(['vacant', 'poste']);
  }

  goToZone(zone: ZoneDak) {
    this.router.navigate(['fiche', 'planning-incomplet', zone.idzone]);
  }

}
