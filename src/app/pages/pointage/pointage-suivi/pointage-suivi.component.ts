import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-pointage-suivi',
  templateUrl: './pointage-suivi.component.html',
  styleUrls: ['./pointage-suivi.component.scss']
})
export class PointageSuiviComponent implements OnInit {

  zones = new Array<ZoneDak>();
  postes = new Array<Poste>();
  affectations = new Array<Affectation>();
  resultatsAffectations = new Array<Affectation>();
  zone = new ZoneDak();
  horaire = 'tous';
  date = new Date();

  constructor(
    private posteService: JarvisService<Poste>,
    private zoneService: JarvisService<ZoneDak>,
    private affectationService: JarvisService<Affectation>,
  ) { }

  ngOnInit(): void {

    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;

      this.affectationService.getAll('affectation').then((affectations) => {
        console.log('affectations');
        console.log(affectations);
        this.affectations = affectations;

        this.posteService.getAll('poste').then((data) => {
          console.log('data');
          console.log(data);
          this.postes = data;
        });

      });
    });
  }

  getAffectationByZone(zone: ZoneDak, d: Date) {
    const date = new Date();
    this.resultatsAffectations = new Array<Affectation>();
    this.resultatsAffectations = this.affectations.filter((affectation) => {
      const isBonneZone = affectation.idposte.zone.idzone === zone.idzone;
      const isBonneDateDebut = date.getTime() >= new Date(affectation.dateAffectation).getTime();
      let isBonneDateFin = true;
      if (affectation.arret) {
        isBonneDateFin = new Date(affectation.arret).getTime() >= date.getTime();
      }
      return  isBonneZone && isBonneDateDebut && isBonneDateFin;
    });
  }

}
