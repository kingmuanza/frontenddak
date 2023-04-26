import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Affectation } from '../models/affectation.model';
import { Vigile } from '../models/vigile.model';

@Injectable({
  providedIn: 'root'
})
export class AffectationCtrlService {
  URL = 'http://localhost:8080/dakBack/webresources/services/affectation/';

  constructor(
    private http: HttpClient,) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url + "services/affectation/";
    } else {

    }
  }

  async getAffectationOfVigile(vigile: Vigile): Promise<Affectation> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "vigile" + '/' + vigile.idvigile).subscribe({
        next: (data) => {
          const resulat = data as Affectation;
          resolve(resulat);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

}
