import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  currentUserSubject = new Subject<any>();
  stockage: any;

  constructor() {
    this.stockage = sessionStorage;
  }

  actualiser() {
    console.log('actualiser');
    this.currentUser = this.getUser().then((user)=> {
      this.currentUser = user;
      this.notifier();
    });
  }

  isAuthUser(): boolean {
    let reponse = false;
    this.currentUser = this.getUser();
    if (this.currentUser) {
      reponse = true;
    }
    return reponse;
  }

  connexion(serveur: string, l: string, passe: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.currentUser = {
        login: l
      }
      this.saveUser(this.currentUser);
      this.notifier();
      resolve();
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        resolve(this.currentUser);
      } else {
        resolve(this.getSessionUser());
      }
    });
  }

  deconnexion(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.currentUser = null;
      this.stockage.removeItem('dak-user');
      this.actualiser();
      resolve();
    });
  }

  private saveUser(user: any) {
    this.stockage.setItem('dak-user', JSON.stringify(user));
  }

  private notifier() {
    this.currentUserSubject.next(this.currentUser);
  }

  private getSessionUser(): any {
    const userString = this.stockage.getItem('dak-user');
    if (userString) {
      const user = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }
}
