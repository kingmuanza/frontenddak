import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-menu-haut',
  templateUrl: './menu-haut.component.html',
  styleUrls: ['./menu-haut.component.scss']
})
export class MenuHautComponent implements OnInit {

  @Input() user: any;
  userSubscription!: Subscription;
  serveur = "";

  constructor(
    private authService: AuthService,
    private jarvisService: JarvisService<any>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.serveur = this.formatUrl(this.jarvisService.URL);
  }

  formatUrl(url: string) {
    const partie1 = url.split('//')[0];
    const partie2 = url.split('//')[1];
    const nomDomaine = partie2.split('/')[0];
    return partie1 + "//" + nomDomaine;

  }

  getUser() {
    this.userSubscription = this.authService.currentUserSubject.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.authService.actualiser();
  }

  deconnexion() {
    const oui = confirm("Etes vous sûr de vouloir vous déconnecter ?");
    if (oui) {
      this.authService.deconnexion().then(()=> {
        this.router.navigate(['connexion']);
      });
    }
  }
}
