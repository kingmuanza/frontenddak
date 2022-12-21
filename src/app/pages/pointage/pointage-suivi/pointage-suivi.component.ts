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
  remotePostes = new Array<any>();
  affectations = new Array<Affectation>();
  resultatsAffectations = new Array<Affectation>();
  vigiles = new Array<Vigile>();
  zone = new ZoneDak();
  horaire = 'tous';
  date = new Date();
  pointages = new Array<Pointage>();

  marge = 10;

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

    this.pointageService.getAllRemotePostes().then((remotePostes) => {
      console.log('remotePostes');
      console.log(remotePostes);
      this.remotePostes = remotePostes;
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

  isBonneLocalisation(affectation: Affectation, date: Date): boolean {
    const pointage = this.getPointageVigileDate(affectation, date)
    const distanceEnMetres = 1000 * this.calcCrow(0, 0, this.getMinDifferenceLatitude(affectation, date), this.getMinDifferenceLongitude(affectation, date))
    if (distanceEnMetres > this.marge) {
      return false;
    }
    return true;
  }

  isBonHoraire(affectation: Affectation, date: Date) {
    return true
  }

  getRemotePoste(poste: Poste) {
    let remotePoste: any = new Poste();
    this.remotePostes.forEach((p) => {
      if (p.idposte === poste.idposte) {
        remotePoste = p;
      }
    });
    return remotePoste;
  }

  getDifferenceLatitude(affectation: Affectation, date: Date): {
    diff: number,
    diff1: number,
    diff2: number,
  } {
    const triangle = {
      diff: 1000,
      diff1: 1000,
      diff2: 1000,
    }
    const latitudeDuPointage = this.getPointageVigileDate(affectation, date);
    if (latitudeDuPointage) {
      if (this.getRemotePoste(affectation.idposte).latitude)
      triangle.diff = this.getRemotePoste(affectation.idposte).latitude - latitudeDuPointage.latitude;
      if (this.getRemotePoste(affectation.idposte).latitude1)
      triangle.diff1 = this.getRemotePoste(affectation.idposte).latitude1 - latitudeDuPointage.latitude;
      if (this.getRemotePoste(affectation.idposte).latitude2)
      triangle.diff2 = this.getRemotePoste(affectation.idposte).latitude2 - latitudeDuPointage.latitude;
    }
    return triangle;
  }

  getDifferenceLongitude(affectation: Affectation, date: Date): {
    diff: number,
    diff1: number,
    diff2: number,
  } {
    const triangle = {
      diff: 1000,
      diff1: 1000,
      diff2: 1000,
    }
    const longitudeDuPointage = this.getPointageVigileDate(affectation, date);
    if (longitudeDuPointage) {
      if (this.getRemotePoste(affectation.idposte).longitude)
      triangle.diff = this.getRemotePoste(affectation.idposte).longitude - longitudeDuPointage.longitude;
      if (this.getRemotePoste(affectation.idposte).longitude1)
      triangle.diff1 = this.getRemotePoste(affectation.idposte).longitude1 - longitudeDuPointage.longitude;
      if (this.getRemotePoste(affectation.idposte).longitude2)
      triangle.diff2 = this.getRemotePoste(affectation.idposte).longitude2 - longitudeDuPointage.longitude;
    }
    return triangle;
  }

  getMinDifferenceLatitude(affectation: Affectation, date: Date) {
    const differences = this.getDifferenceLatitude(affectation, date);
    return Math.min(Math.abs(differences.diff), Math.abs(differences.diff1), Math.abs(differences.diff2));
  }


  getMinDifferenceLongitude(affectation: Affectation, date: Date) {
    const differences = this.getDifferenceLongitude(affectation, date);
    return Math.min(Math.abs(differences.diff), Math.abs(differences.diff1), Math.abs(differences.diff2));
  }

  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) 
  {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(value: number) 
  {
      return value * Math.PI / 180;
  }
}
