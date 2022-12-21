import { Injectable } from '@angular/core';
import { Poste } from '../models/poste.model';
import { Vigile } from '../models/vigile.model';
import { ZoneDak } from '../models/zone.model';
import { BesoinVigile } from '../structures/besoin.vigile';
import { JarvisService } from './jarvis.service';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  constructor(
    private zoneService: JarvisService<ZoneDak>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
  ) { }

  getBesoinEnVigilesEnFonctionDesPostes(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject) => {
      this.posteService.getAll('poste').then((postes) => {
        postes.forEach((poste) => {
          if (poste.nombreVigileJour) {
            besoinVigile.nbBesoinVigilesJour += poste.nombreVigileJour;
          }
          if (poste.nombreVigileNuit) {
            besoinVigile.nbBesoinVigilesNuit += poste.nombreVigileNuit;
          }
        });
        resolve(besoinVigile);
      });

    });
  }

  getVigilesEngagesActu(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject) => {
      this.vigileService.getAll('vigile').then((vigiles) => {
        console.log('vigiles');
        console.log(vigiles);
        vigiles.forEach((vigile) => {
          if (!vigile.estRemplacant) {
            if (vigile.horaire === 'jour') {
              besoinVigile.nbVigilesJour += 1;
            }
            if (vigile.horaire === 'nuit') {
              besoinVigile.nbVigilesNuit += 1;
            }
          }
        });
        resolve(besoinVigile);
      });
    });
  }

  getBesoinVigiles(): Promise<BesoinVigile> {
    const besoinVigile = new BesoinVigile();
    return new Promise((resolve, reject) => {
      this.getVigilesEngagesActu().then((vigilesEngagesActu) => {
        besoinVigile.nbVigilesJour = vigilesEngagesActu.nbVigilesJour;
        besoinVigile.nbVigilesNuit = vigilesEngagesActu.nbVigilesNuit;
        this.getBesoinEnVigilesEnFonctionDesPostes().then((besoinEnVigilesEnFonctionDesPostes) => {
          besoinVigile.nbBesoinVigilesJour = besoinEnVigilesEnFonctionDesPostes.nbBesoinVigilesJour;
          besoinVigile.nbBesoinVigilesNuit = besoinEnVigilesEnFonctionDesPostes.nbBesoinVigilesNuit;
          resolve(besoinVigile);
        });
      });
    });
  }

  lineFromPoints(P:number[], Q:number[])
  {
      let a = Q[1] - P[1];
      let b = P[0] - Q[0];
      let c = a*(P[0])+ b*(P[1]);
      return [a, b, c];
  }
   
  // Function which converts the input line to its
  // perpendicular bisector. It also inputs the points
  // whose mid-point lies on the bisector
  perpendicularBisectorFromLine(P:number[], Q:number[], a:number, b:number, c:number)
  {
      let mid_point = [(P[0] + Q[0])/2, (P[1] + Q[1])/2];
   
      // c = -bx + ay
      c = -b*(mid_point[0]) + a*(mid_point[1]);
   
      let temp = a;
      a = -b;
      b = temp;
      return [a, b, c];
  }
   
  // Returns the intersection point of two lines
  lineLineIntersection(a1:number, b1:number, c1:number, a2:number, b2:number, c2:number)
  {
      let determinant = a1*b2 - a2*b1;
      if (determinant == 0)
      {
          // The lines are parallel. This is simplified
          // by returning a pair of FLT_MAX
          return  [(10.0)**19, (10.0)**19];
      }
   
      else
      {
          let x = (b2*c1 - b1*c2)/determinant;
          let y = (a1*c2 - a2*c1)/determinant;
          return [x, y];
      }
  }
   
  findCircumCenter(P:number[], Q:number[], R:number[])
  {
      // Line PQ is represented as ax + by = c
      let PQ_line = this.lineFromPoints(P, Q);
      let a = PQ_line[0];
      let b = PQ_line[1];
      let c = PQ_line[2];
      
      // Line QR is represented as ex + fy = g
      let QR_line = this.lineFromPoints(Q, R);
      let e = QR_line[0];
      let f = QR_line[1];
      let g = QR_line[2];
       
      // Converting lines PQ and QR to perpendicular
      // vbisectors. After this, L = ax + by = c
      // M = ex + fy = g
      let PQ_perpendicular = this.perpendicularBisectorFromLine(P, Q, a, b, c);
      a = PQ_perpendicular[0];
      b = PQ_perpendicular[1];
      c = PQ_perpendicular[2];
       
      let QR_perpendicular = this.perpendicularBisectorFromLine(Q, R, e, f, g);
      e = QR_perpendicular[0];
      f = QR_perpendicular[1];
      g = QR_perpendicular[2];
       
      // The point of intersection of L and M gives
      // the circumcenter
      let circumcenter = this.lineLineIntersection(a, b, c, e, f, g);
   
      if (circumcenter[0] == (10.0)**19 && circumcenter[1] == (10.0)**19){
          console.log("The two perpendicular bisectors found come parallel" )
          console.log("Thus, the given points do not form a triangle and are collinear");
      }
      else{
          console.log("The circumcenter of the triangle PQR is: (", circumcenter[0], ",", circumcenter[1], ")");
      }
  }


}
