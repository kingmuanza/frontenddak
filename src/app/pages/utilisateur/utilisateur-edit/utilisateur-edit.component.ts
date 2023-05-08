import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { JarvisService } from 'src/app/services/jarvis.service';


@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent implements OnInit {

  utilisateur = new Utilisateur();
  processing = false;

  passe = "";
  confirmation = "";
  showErrors = false;

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
        });
      }
    });
  }

  save() {
    this.showErrors = true;
    console.log(this.utilisateur);
    if (this.utilisateur.login && this.utilisateur.noms) {
      if (this.passe == this.confirmation) {
        if (this.passe.length > 3) {
          if (this.utilisateur.idutilisateur == 0) {
            this.processing = true;
            this.hashPassword(this.passe).then((hash) => {
              this.utilisateur.passe = hash;
              this.utilisateurService.ajouter('utilisateur', this.utilisateur).then((data) => {
                console.log('data');
                console.log(data);
                this.processing = false;
                this.notifierService.notify('success', "Ajout effectué avec succès");
                this.router.navigate(['utilisateur']);
              });
            });
          }
        }
      }
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

}
