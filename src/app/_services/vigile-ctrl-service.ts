import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrat } from '../models/contrat.model';
import { JarvisService } from '../services/jarvis.service';
import { Vigile } from '../models/vigile.model';

@Injectable({
  providedIn: 'root'
})
export class VigileCtrlService {
  URL = 'http://localhost:8080/dakBack/webresources/services/vigile/';

  constructor(
    private http: HttpClient,
  ) {
    const url = sessionStorage.getItem('serveur-dak');
    if (url) {
      this.URL = url + "webresources/services/vigile/";
    } else {

    }
    this.init();
  }

  async init() {
  }

  async getVigileByMatricule(matricule: string): Promise<Vigile> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "matricule/" + matricule).subscribe({
        next: (data) => {
          const resulats = data as Array<Vigile>;
          if (resulats.length > 0) {
            resolve(resulats[0]);
          } else {
            resolve(new Vigile());
          }
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getVigilesByMatricule(matricule: string): Promise<Array<Vigile>> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "matricule/" + matricule).subscribe({
        next: (data) => {
          const resulats = data as Array<Vigile>;
          if (resulats.length > 0) {
            resolve(resulats);
          } else {
            resolve([]);
          }
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getVigilesVacants(): Promise<Vigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "vacants").subscribe({
        next: (data) => {
          const resulats = data as Vigile[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getDuplicatesMatricules(): Promise<Vigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "duplicates-matricule").subscribe({
        next: (data) => {
          const resulats = data as Vigile[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getDuplicatesCNI(): Promise<Vigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "duplicates-cni").subscribe({
        next: (data) => {
          const resulats = data as Vigile[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getVigilesByCNI(numCNI: string): Promise<Vigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "vigiles-by-cni/" + numCNI).subscribe({
        next: (data) => {
          const resulats = data as Vigile[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

  async getDuplicatesNoms(): Promise<Vigile[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + "duplicates-noms").subscribe({
        next: (data) => {
          const resulats = data as Vigile[];
          resolve(resulats);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }


}
