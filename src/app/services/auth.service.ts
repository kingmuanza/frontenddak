import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
import { JarvisService } from './jarvis.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any = new Utilisateur();
  currentUserSubject = new Subject<Utilisateur | null>();
  stockage: any;

  constructor(

    private utilisateurService: JarvisService<Utilisateur>
  ) {
    this.stockage = localStorage;
  }

  actualiser() {
    // console.log('actualiser');
    this.getUser().then((user) => {
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
      } else if (login === 'contrat' && passe === 'contrat') {
        this.currentUser = {
          login: 'contrat',
          role: 'Contrat',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      }
      else if (login === 'rh' && passe === 'rh') {
        this.currentUser = {
          login: 'rh',
          role: 'RH',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      } else if (login === 'suivi' && passe === 'suivi') {
        this.currentUser = {
          login: 'suivi',
          role: 'suivi',
          id: 0
        }
        this.saveUser(this.currentUser);
        this.notifier();
        resolve();
      } else {
        this.connexionViaServeur(login, passe).then((u) => {
          this.saveUser(u);
          this.notifier();
          resolve();
        }).catch((e) => {
          reject(e);
        });
      }

    });
  }

  connexionViaServeur(login: string, passe: string): Promise<any> {
    return new Promise((resolve, reject) => {
      var bcrypt = require('bcryptjs');
      this.utilisateurService.getAll('utilisateur').then((resultats) => {
        const utilisateurs = resultats.filter((u) => {
          return u.login === login;
        });
        if (utilisateurs.length > 0) {
          const u = utilisateurs[0];
          bcrypt.compare(passe, u.passe).then((res: boolean) => {
            if (res) {
              this.currentUser = u;
              this.currentUser['role'] = 'admin';
              this.saveUser(this.currentUser);
              this.notifier();
              resolve(u);
            } else {
              reject("Mot de passe incorrect");
            }
          });

        } else {
          reject("Acun utilisateur");
        }
      });
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
