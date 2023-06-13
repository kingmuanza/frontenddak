import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Suivi } from 'src/app/models/suivi.model';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { PointageService } from 'src/app/services/pointage.service';

@Component({
  selector: 'app-sanction-list',
  templateUrl: './sanction-list.component.html',
  styleUrls: ['./sanction-list.component.scss']
})
export class SanctionListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  sanctions = new Array<any>();
  pointages = new Array<any>();
  absencesRemote = new Array<any>();
  numeros = new Array<string>();

  numeroLePlusHaut = 0;

  mesDroits = droits;

  constructor(
    private router: Router,
    private suiviService: JarvisService<Suivi>,
    private vigileService: JarvisService<Vigile>,
    private pointageService: PointageService,
    private authService: AuthService,
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
    this.suiviService.getAll('suiviposte').then((data) => {
      console.log('data');
      console.log(data);
      this.sanctions = data;
      this.sanctions.forEach((sanction) => {
        if (sanction.numero) {
          this.numeros.push(sanction.numero);
        }
      });
      console.log("this.numeros");
      console.log(this.numeros);
      this.numeroLePlusHaut = this.getNumeroLePlusHaut();

      console.log("this.numeroLePlusHaut");
      console.log(this.numeroLePlusHaut);
      this.dtTrigger.next('');
      this.pointageService.getPointages().then((pointages) => {
        this.pointages = pointages;

      });
    });
  }


  public importer() {
    this.importOnlineAbsences(this.pointages).then((n) => {
      console.log("importation terminnée");
      if (n > 0) {
        window.location.reload();
      }
    });
  }

  isElementDansListe(n: string, liste: Array<string>) {
    let is = false;
    liste.forEach((numero) => {
      if (numero === n) {
        is = true;
      }
    });
    return is;
  }


  async importOnlineAbsences(pointages: any[]): Promise<number> {
    // Evitez les doubles absences
    let doubles = new Array<string>();
    let n = 0;

    for (let i = 0; i < pointages.length; i++) {
      const pointage = pointages[i];
      if (pointage.absence && pointage.idvigile && pointage.id) {
        if (Number(pointage.id.slice(0, 14)) > this.numeroLePlusHaut) {
          if (!this.isNumeroDansNumeros(pointage.id)) {
            let identifiant = pointage.id.slice(0, 8) + '' + pointage.idvigile;
            console.log(identifiant);
            if (!this.isElementDansListe(identifiant, doubles)) {
              doubles.push(identifiant);
              this.absencesRemote.push(pointage);
              const d = this.toDate(pointage.date);
              let suivi = new Suivi();
              suivi.numero = pointage.id;
              suivi.dateEffet = d;
              suivi.dateSuivi = d;
              suivi.motifSanction = "Absence";
              let vigile = await this.vigileService.get('vigile', Number(pointage.idvigile));

              if (vigile) {
                suivi.idvigile = vigile;
                suivi.nombreAbsence = 2;
                suivi.commentaire = pointage.commentaire;
                console.log(suivi);
                await this.suiviService.ajouterSilent('suiviposte', suivi);
                n++;
              }
            }
          }
        }
      }
    }

    return n;
  }

  toDate(timestp: any): Date {
    if (timestp.seconds) {
      return new Date(timestp.seconds * 1000);

    } else {
      return new Date();
    }
  }

  isNumeroDansNumeros(n: string) {
    let is = false;
    this.numeros.forEach((numero) => {
      if (numero === n) {
        is = true;
      }
    });
    return is;
  }

  getNumeroLePlusHaut(): number {
    let numeroLePlusHaut = 0;
    this.numeros.forEach((numero) => {
      try {
        let n = Number(numero.split("-")[0]);
        if (n) {
          if (n > numeroLePlusHaut) {
            numeroLePlusHaut = n;
          }
        }
      } catch (error) {

      }
    });
    return numeroLePlusHaut
  }

  edit(id: string) {
    this.router.navigate(['sanction', 'edit', id]);
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
