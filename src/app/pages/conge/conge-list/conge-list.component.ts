import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-conge-list',
  templateUrl: './conge-list.component.html',
  styleUrls: ['./conge-list.component.scss']
})
export class CongeListComponent implements OnInit {

  vigiles = new Array<Vigile>();
  vigilesEnConges = new Array<Vigile>();
  vigilesCetteSemaine = new Array<Vigile>();
  vigilesAvecConges = new Array<Vigile>();
  vigilesAvecDate: any = {};
  vigilesParDate = new Array<{
    valeur: string,
    vigiles: Array<Vigile>
  }>();

  dernierJourSemaine = new Date();
  vigilesEnCongesCeMois = 0;

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Vigile>
  ) { }

  ngOnInit(): void {
    this.dernierJourSemaine = this.getDernierJourSemaine();
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      data.forEach((vigile) => {
        if (vigile.dateEntree) {
          const v = new Vigile();
          v.copy(vigile);
          this.vigilesAvecConges.push(v);
        }
      });
      const ojrd8 = new Date();
      const ojrd8M = ojrd8.toLocaleString('fr-FR', { month: '2-digit' });
      this.vigilesAvecConges.forEach((vigile) => {
        if (this.dateCetteAnnee(vigile.dateEntree).getTime() > this.dernierJourSemaine.getTime()) {
          const date = new Date(vigile.dateEntree);
          const mois = date.toLocaleString('fr-FR', { month: 'long' });
          const m = date.toLocaleString('fr-FR', { month: '2-digit' });
          if (m >= ojrd8M) {
            console.log("m");
            console.log(m);
            if (this.vigilesAvecDate[m + '--' + mois]) {
              this.vigilesAvecDate[m + '--' + mois].push(vigile);
            } else {
              this.vigilesAvecDate[m + '--' + mois] = [vigile];
            }
          }
        } else {
          const date = new Date(vigile.dateEntree);
          const mois = date.toLocaleString('fr-FR', { month: 'long' });
          const m = date.toLocaleString('fr-FR', { month: '2-digit' });
          if (m >= ojrd8M) {
            this.vigilesCetteSemaine.push(vigile);
          } else {
            
          }
        }
        if ( new Date().getTime() > new Date(vigile.debutConge).getTime() && new Date().getTime() < new Date(vigile.finConge).getTime()) {
          this.vigilesEnConges.push(vigile);
        }
      });
      this.vigiles = data;

      console.log("this.vigilesAvecDate");
      console.log(this.vigilesAvecDate);

      const keys = Object.keys(this.vigilesAvecDate);
      keys.forEach((key) => {
        let lesVigiles = new Array<Vigile>();
        lesVigiles = this.vigilesAvecDate[key];
        
        if (key.split('--')[0] == ojrd8M) {
          this.vigilesEnCongesCeMois = lesVigiles.length;
        }
        this.vigilesParDate.push({
          valeur: key,
          vigiles: lesVigiles.sort((a, b) => {
            return new Date(a.dateEntree).getTime() - new Date(b.dateEntree).getTime() > 0 ? 1 : -1;
          })
        });
      });
      console.log("this.vigilesParDate");
      console.log(this.vigilesParDate);
      this.vigilesParDate.sort((a, b) => {
        return a.valeur > b.valeur ? 1 : -1;
      });
    });
  }

  dateCetteAnnee(date: Date): Date {
    const d = new Date(date);
    d.setFullYear(new Date().getFullYear());
    return d;
  }

  getDernierJourSemaine(): Date {
    let date = new Date();
    const duree = 24 * 60 * 60 * 1000;
    if (date.getDay() === 1) {
      return date;
    } else {
      return new Date(date.getTime() + (7 - date.getDay()) * duree);
    }
  }

  libelleDuMois(valeur: string): string {
    const ojrd8 = new Date();
    const ojrd8M = ojrd8.toLocaleString('fr-FR', { month: '2-digit' });
    if (valeur.split('--')[0] == ojrd8M) {
      return "Plus tard de mois-ci"
    } else {
      return this.capitalizeFirstLetter(valeur.split('--')[1]);
    }
  }

  capitalizeFirstLetter(valeur: string): string {
    if (valeur.length > 0) {
      return valeur.charAt(0).toUpperCase() + valeur.slice(1);
    } else {
      return '';
    }
  }

  edit(id: string | number) {
    this.router.navigate(['vigile', 'edit', id]);
  }

  libelleFonction(fonction: string) {
    if (fonction == "AGENT")
      return "Agent de sécurité";
    if (fonction == "ESCORTEUR")
      return "Escorteur";
    if (fonction == "CONTROLEUR")
      return "Contrôleur";
    if (fonction == "CHAUFFEUR")
      return "Chauffeur";
    if (fonction == "MAITRECHIEN")
      return "Maitre Chien";

    return "";
  }

  libelleStatut(jour: number) {
    if (jour == 1)
      return "Absent[e]";
    if (jour == 2)
      return "Actif[ve]";
    if (jour == 3)
      return "Licencié(e)";
    if (jour == 4)
      return "Standby";
    if (jour == 5)
      return "Suspendu[e]";
    if (jour == 6)
      return "Démissionné[e]";
    if (jour == 7)
      return "Décédé[e]";

    return "" + jour ? jour : "";
  }


  jourSemaine(jour: number) {
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

    return "" + jour ? jour : "";
  }

}
