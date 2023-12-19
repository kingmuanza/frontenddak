import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { droits } from 'src/app/data/droits';
import { Suivi } from 'src/app/models/suivi.model';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { VigileService } from 'src/app/services/vigile.service';

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
  nombre = 1;
  ojrdhui = new Date();
  datesPrises = new Array<Date>();

  mesDroits = droits;

  rechercheVigile = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any>,
    private authService: AuthService,
    private vigileService: VigileService,
  ) { }

  ngOnInit(): void {

    this.authService.currentUserSubject.subscribe((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur) {
        try {
          this.mesDroits = JSON.parse(utilisateur.droits);
        } catch (error) {
          this.mesDroits = droits;
        }
      }
    });
    this.authService.notifier();
    this.ojrdhui.setDate(this.ojrdhui.getDate() - 1)

    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');

      if (id) {
        this.jarvisService.get('suiviposte', Number(id)).then((suivi) => {
          this.suivi = suivi;
          this.getVigiles(this.suivi.idvigile.nom).then((vigiles) => {
            this.vigiles = vigiles;
            console.log('le suivi recupéré');
            console.log(suivi);
            this.calculerDatesFutures(suivi)

            this.suivi.dateSuivi = suivi.dateSuivi?.split('T')[0];

            this.getJourSemaine(this.suivi.dateSuivi);

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
        });
      } else {
        this.getJourSemaine();
      }

    });
  }

  getVigiles(texte: string): Promise<Array<Vigile>> {
    return new Promise((resolve, reject) => {
      if (texte.length > 4)
        this.vigileService.rechercheCalme(texte).then((vigiles) => {
          this.vigiles = vigiles;
          resolve(this.vigiles);
        });
    });
  }

  save() {
    console.log('suivi à enregistrer');
    console.log(this.suivi);
    if (this.suivi.dateSuivi)
      this.suivi.dateSuivi = new Date(this.suivi.dateSuivi);
    if (this.suivi.dateEffet)
      this.suivi.dateEffet = new Date(this.suivi.dateEffet);

    if (this.suivi.idsuiviPoste == 0) {
      if (this.suivi.motifSanction && this.suivi.idvigile) {
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
        this.router.navigate(['sanction']);
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
    this.suivi.dateEffet = new Date(ev);
    if (ev) {
      console.log(ev);
      console.log(new Date(ev).getDay());
      this.jour = this.jourSemaine(new Date(ev).getDay());
    } else {
      this.jour = this.jourSemaine(new Date().getDay());
    }
  }

  calculerDatesFutures(suivi: Suivi) {
    let date = suivi.dateEffet;
    let nombreDeJours = suivi.nombreAbsence;
    let vigile = suivi.idvigile;
    this.datesPrises = new Array<Date>();
    let jourSemaine = Number(vigile.jourRepos) % 7;
    if (date && nombreDeJours && vigile) {
      date = new Date(date);
      for (let i = 0; i < nombreDeJours * 7; i++) {
        date.setDate(date.getDate() + 1);
        console.log(date.toISOString().split('T')[0]);
        if (date.getDay() === jourSemaine) {
          this.datesPrises.push(new Date(date));
        }
      }
    }

  }

}
