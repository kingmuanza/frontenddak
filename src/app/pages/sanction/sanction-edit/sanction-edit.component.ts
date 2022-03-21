import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Suivi } from 'src/app/models/suivi.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-sanction-edit',
  templateUrl: './sanction-edit.component.html',
  styleUrls: ['./sanction-edit.component.scss']
})
export class SanctionEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  suivi = new Suivi();
  processing = false;
  postes = new Array<any>();
  vigiles = new Array<any>();
  jour = '';
  estRemplacant = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.getPostes().then((postes) => {
      this.postes = postes;
      this.getVigiles().then((vigiles) => {
        this.vigiles = vigiles;
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.jarvisService.get('suiviposte', Number(id)).then((suivi) => {
              console.log('le suivi recupéré');
              console.log(suivi);
              this.suivi = suivi;

              this.suivi.dateSuivi = suivi.dateSuivi?.split('T')[0];
              // this.suivi.arret = suivi.finContrat?.split('T')[0];

              this.getJourSemaine(this.suivi.dateSuivi);
              postes.forEach((poste) => {
                if (this.suivi.poste && poste.idposte == this.suivi.poste.idposte) {
                  this.suivi.poste = poste;
                }
              });
              vigiles.forEach((vigile) => {
                if (this.suivi.idvigile && vigile.idvigile == this.suivi.idvigile.idvigile) {
                  this.suivi.idvigile = vigile;
                }
              });
              vigiles.forEach((vigile) => {
                if (this.suivi.remplacant && vigile.idvigile == this.suivi.remplacant.idvigile) {
                  this.suivi.remplacant = vigile;
                }
              });
            });
          } else {
            this.getJourSemaine();
          }
        });
      });
    });
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('poste').then((postes) => {
        console.log('postes');
        console.log(postes);
        resolve(postes);
      });
    });
  }

  getVigiles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('vigile').then((vigiles) => {
        console.log('vigiles');
        console.log(vigiles);
        resolve(vigiles);
      });
    });
  }

  save() {
    console.log('suivi à enregistrer');
    console.log(this.suivi);
    if (this.suivi.dateSuivi)
      this.suivi.dateSuivi = new Date(this.suivi.dateSuivi);
    if (this.suivi.idsuiviPoste == 0) {
      if (this.suivi.poste && this.suivi.idvigile) {
        this.processing = true;
        this.jarvisService.ajouter('suiviposte', this.suivi).then((data) => {
          console.log('data');
          console.log(data);
          this.processing = false;
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['sanction']);
        }).catch((e) => {
          this.processing = false;
        });
      } else {
        this.notifierService.notify('error', "Veuillez renseigner un code et un libellé");
      }
    } else {
      this.processing = true;
      this.jarvisService.modifier('suiviposte', this.suivi.idsuiviPoste, this.suivi).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['sanction']);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('suiviposte', this.suivi.idsuiviPoste).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['suivi']);
      });
    }
  }

  jourSemaine(jour: number): string {
    if (jour == 1)
      return "Lundi";
    if (jour == 2)
      return "Mardi";
    if (jour == 3)
      return "Mercredi";
    if (jour == 4)
      return "Jeudi";
    if (jour == 5)
      return "Vendredi";
    if (jour == 6)
      return "Samedi";
    if (jour == 7)
      return "Dimanche";

    return '' + jour;
  }

  getJourSemaine(ev?: any) {
    if (ev) {
      console.log(ev);
      console.log(new Date(ev).getDay());
      this.jour = this.jourSemaine(new Date(ev).getDay());
    } else {
      this.jour = this.jourSemaine(new Date().getDay());
    }
  }

}
