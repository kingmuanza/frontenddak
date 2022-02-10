import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PointageService {

  URL = 'http://localhost:8080/dakBack/webresources/';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return new Promise((resolve, reject)  => {
      this.http.get(this.URL + 'zone').subscribe((data) => {
        resolve(data);
      });
    });
  }
}
