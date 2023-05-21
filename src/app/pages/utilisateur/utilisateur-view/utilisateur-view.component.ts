import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { droits } from 'src/app/data/droits';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-utilisateur-view',
  templateUrl: './utilisateur-view.component.html',
  styleUrls: ['./utilisateur-view.component.scss']
})
export class UtilisateurViewComponent implements OnInit {

  utilisateur = new Utilisateur();
  processing = false;

  passe = "";
  confirmation = "";
  showErrors = false;
  showPasseErrors = false;

  lesDroits: any = droits;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private utilisateurService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.utilisateurService.get('utilisateur', Number(id)).then((utilisateur) => {
          console.log('utilisateur');
          console.log(utilisateur);
          this.utilisateur = utilisateur;
          try {
            this.lesDroits = JSON.parse(utilisateur.droits);
          } catch (error) {
            this.lesDroits = droits;
          }
        });
      }
    });
  }

  modifier() {
    this.showErrors = true;
    console.log("this.utilisateur");
    console.log(this.utilisateur);
    console.log(this.utilisateur.login);
    console.log(this.utilisateur.noms);
    if (this.utilisateur.login && this.utilisateur.noms) {
      this.utilisateurService.modifier('utilisateur', this.utilisateur.idutilisateur, this.utilisateur).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        window.location.reload();
      }).catch((error) => {
        console.log('error');
        console.log(error);
      });
    }
  }

  hashPassword(passe: string): Promise<string> {
    console.log('hashPassword');
    const bcrypt = require('bcryptjs');
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(5, function (err: any, salt: any) {
        bcrypt.hash(passe, salt, function (e: any, hash: string) {
          console.log(hash);
          resolve(hash);
        });
      });
    });
  }

  changerPasse() {
    this.showPasseErrors = true;
    console.log("this.utilisateur");
    console.log(this.utilisateur);
    console.log(this.utilisateur.login);
    console.log(this.utilisateur.noms);
    if (this.passe && this.confirmation) {
      if (this.passe == this.confirmation) {
        this.hashPassword(this.passe).then((hash) => {
          this.utilisateur.passe = hash;
          this.utilisateurService.modifier('utilisateur', this.utilisateur.idutilisateur, this.utilisateur).then((data) => {
            console.log('data');
            console.log(data);
            this.processing = false;
            this.notifierService.notify('success', "Modification effectuée avec succès");
            window.location.reload();
          }).catch((error) => {
            console.log('error');
            console.log(error);
          });
        });
      }
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.utilisateurService.supprimer('utilisateur', this.utilisateur.idutilisateur).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['utilisateur']);
      });
    }
  }

  setDroit(key: string, event: any) {
    console.log("key : " + key);
    console.log("event ");
    this.lesDroits[key] = event.target.checked;
    console.log(event.target.checked);
    console.log(this.lesDroits);
  }

  saveDroits() {
    this.utilisateur.droits = JSON.stringify(this.lesDroits);
    console.log(this.utilisateur);
    this.utilisateurService.modifier('utilisateur', this.utilisateur.idutilisateur, this.utilisateur).then((data) => {
      console.log('data');
      console.log(data);
      window.location.reload();
    });
  }

}
