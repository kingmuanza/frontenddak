import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject = new Subject<boolean>();

  constructor() { }

  afficher() {
    this.loadingSubject.next(true);
  }

  cacher() {
    this.loadingSubject.next(false);
  }
}
