import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any = new Utilisateur();
  currentUserSubject = new Subject<Utilisateur | null>();
  stockage: any;

  constructor() {
    this.stockage = localStorage;
  }

  actualiser() {
    // console.log('actualiser');
    this.getUser().then((user)=> {
      this.currentUser = user;
      this.notifier();
    });
  }

  isAuthUser(): boolean {
    let reponse = false;
    this.getUser();
    if (this.currentUser) {
      reponse = true;
    }
    return reponse;
  }

  connexion(serveur: string, login: string, passe: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (login === 'admin' && passe === 'admin') {
        this.currentUser = {
          login: 'admin',
          role: 'Administrateur',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      }
      if (login === 'contrat' && passe === 'contrat') {
        this.currentUser = {
          login: 'contrat',
          role: 'Contrat',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      }
      if (login === 'rh' && passe === 'rh') {
        this.currentUser = {
          login: 'rh',
          role: 'RH',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      }
      if (login === 'suivi' && passe === 'suivi') {
        this.currentUser = {
          login: 'suivi',
          role: 'suivi',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      }
      reject();
    });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      {
        resolve(this.getSessionUser());
      }
    });
  }

  deconnexion(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.currentUser = null;
      this.stockage.removeItem('dak-user');
      this.currentUserSubject.next(null);
      setTimeout(() => {
        resolve();        
      }, 500);
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
