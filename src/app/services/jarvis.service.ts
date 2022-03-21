import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JarvisService<T> {
  URL = 'http://localhost:8080/dakBack/webresources/';

  constructor(
    private http: HttpClient
  ) { }

  
  getAll(table: string): Promise<Array<T>> {
    return new Promise((resolve, reject)  => {
      this.http.get(this.URL + table).subscribe((data) => {
        const donnees = data as Array<T>;
        resolve(donnees);
      });
    });
  }
 
  get(table: string, id: number): Promise<T> {
    return new Promise((resolve, reject)  => {
      this.http.get(this.URL + table + '/' + id).subscribe((data) => {
        const resulat = data as T;
        resolve(resulat);
      });
    });
  }

  ajouter(table: string, objet: T): Promise<boolean> {
    return new Promise((resolve, reject)  => {
      this.http.post(this.URL + table, objet).subscribe((data) => {
        resolve(true);
      });
    });
  }

  modifier(table: string, id: number, objet: T): Promise<boolean> {
    return new Promise((resolve, reject)  => {
      this.http.put(this.URL + table + '/' + id, objet).subscribe((data) => {
        const resulat = data as T;
        resolve(true);
      });
    });
  }

  supprimer(table: string, id: number): Promise<boolean> {
    return new Promise((resolve, reject)  => {
      this.http.delete(this.URL + table + '/' + id).subscribe((data) => {
        resolve(true);
      });
    });
  }

}
