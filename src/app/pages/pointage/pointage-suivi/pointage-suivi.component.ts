import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';
import { Pointage } from 'src/app/models/pointage.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { PointageService } from 'src/app/services/pointage.service';

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
  vigiles = new Array<Vigile>();
  zone = new ZoneDak();
  horaire = 'tous';
  date = new Date();
  pointages = new Array<Pointage>();

  constructor(
    private pointageService: PointageService,
    private posteService: JarvisService<Poste>,
    private zoneService: JarvisService<ZoneDak>,
    private affectationService: JarvisService<Affectation>,
  ) { }

  ngOnInit(): void {

    this.pointageService.getPointages().then((pointages) => {
      console.log('pointages');
      console.log(pointages);
      this.pointages = pointages;
    });

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
    const date = new Date(d);
    this.resultatsAffectations = new Array<Affectation>();
    this.resultatsAffectations = this.affectations.filter((affectation) => {
      const isBonneZone = affectation.idposte.zone.idzone === zone.idzone;
      const isBonneDateDebut = date.getTime() >= new Date(affectation.dateAffectation).getTime();
      let isBonneDateFin = true;
      if (affectation.arret) {
        isBonneDateFin = new Date(affectation.arret).getTime() >= date.getTime();
      }
      return isBonneZone && isBonneDateDebut && isBonneDateFin;
    });
    this.getVigilesConcernes(date);
  }

  getVigilesConcernes(date: Date) {
    this.vigiles = new Array<Vigile>();
    let jour = date.getDay();
    if (jour === 0) {
      jour = 7;
    }
    this.resultatsAffectations.forEach((affectation) => {
      if (affectation.idvigile.jourRepos === jour) {
        this.vigiles.push(affectation.remplacant);
      } else {
        this.vigiles.push(affectation.idvigile);
      }
    });
  }

  showVigile(affectation: Affectation, d: Date): Vigile {
    const date = new Date(d);
    let jour = date.getDay();
    if (jour === 0) {
      jour = 7;
    }
    if (affectation.idvigile.jourRepos === jour) {
      return affectation.remplacant;
    } else {
      return affectation.idvigile;
    }
  }

  getPointage(vigile: Vigile, date: Date): Pointage | undefined {
    let pointage: Pointage | undefined;
    
    this.pointages.forEach((p) => {
      const d = this.toDate(p.date)
      if (p.idvigile === vigile.idvigile && d && this.dateToJourAnnee(d) === this.dateToJourAnnee(date)) {
        pointage = p;
      }
    });
    return pointage;
  }

  dateToJourAnnee(date: Date) {
    return date.getFullYear() + '' + date.getMonth() + date.getDate();
  }

  getPointageVigileDate(affectation: Affectation, d: Date) {
    const date = new Date(d);
    return this.getPointage(this.showVigile(affectation, date), date);
  }

  toDate(timestp: any): Date | undefined {
    if (timestp && timestp.seconds) {
      return new Date(timestp.seconds * 1000);

    } else {
      return undefined;
    }
  }
  
  isBonneLocalisation(pointage: any): boolean {
    if (pointage.idvigile) {
      
    }
    return false;
  }

  isBonHoraire(affectation: Affectation, date: Date) {
    return true
  }


}
