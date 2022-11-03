import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { Conge } from 'src/app/models/conge.model';

@Component({
  selector: 'app-form-conge',
  templateUrl: './form-conge.component.html',
  styleUrls: ['./form-conge.component.scss']
})
export class FormCongeComponent implements OnInit, OnChanges {

  vigile = new Vigile();
  @Input() vigiles = new Array<Vigile>();
  @Input() idvigile = 0;
  @Output() onSaveEvent = new EventEmitter<Vigile>();
  dette = 0;

  filtre = 'DISPONIBLES';

  myModal?: bootstrap.Modal;

  debutConge = new Date();
  finConge = new Date();

  conges = new Array<Conge>();

  constructor(
    private notifierService: NotifierService,
    private vigileService: JarvisService<Vigile>,
    private congeService: JarvisService<Conge>,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (this.idvigile !== 0) {
      this.vigileService.get('vigile', this.idvigile).then((vigile) => {
        // console.log('Form Conge Component'.toUpperCase());
        // console.log('le vigile recupéré');
        // console.log(vigile.debutConge);
        this.vigile = vigile;
        this.dette = this.vigile.detteConges ? this.vigile.detteConges: 0;

        if (vigile.idremplacantConge) {
          this.vigiles.forEach((v) => {
            if (v.idvigile === vigile.idremplacantConge.idvigile) {
              this.vigile.idremplacantConge = v;
            }
          });
        }

        this.congeService.getAll('vigileconge').then((conges) => {
          // console.log('conges');
          // console.log(conges);
          conges = conges.filter((conge) => {
            return conge.idvigile.idvigile === this.vigile.idvigile;
          })
          this.conges = conges.sort((a, b) => {
            return new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime() > 0 ? -1 : 1;
          });
        });
      });
    }
  }

  setConges() {
    const annee = new Date().getFullYear();
    if (this.vigile.dateEntree) {
      const dateDebutConges = new Date(this.vigile.dateEntree);
      dateDebutConges.setFullYear(annee);
      this.vigile.debutConge = dateDebutConges;
    }
  }

  calculerDebutProchainConges() {
    const annee = new Date().getFullYear();
    if (this.vigile.dateEntree) {
      const anneeRecrutement = new Date(this.vigile.dateEntree).getFullYear();
      let debutProchainConges = new Date(this.vigile.dateEntree);
      // S'il a été recruté cette année
      if (annee === anneeRecrutement) {
        debutProchainConges.setFullYear(annee + 1);
        this.vigile.debutConge = debutProchainConges;
      }
      // S'il a été recruté avant cette année
      if (anneeRecrutement < annee) {
        const aujourdhui = new Date();
        debutProchainConges.setFullYear(annee);
        const dateDeSesCongesCetteAnnee = debutProchainConges
        this.vigile.debutConge = dateDeSesCongesCetteAnnee;
        // S'il a déjà pris ces congés
        if (this.vigile.debutConge.getTime() < aujourdhui.getTime()) {
          debutProchainConges.setFullYear(annee + 1);
          const dateDeSesCongesCetteAnnee = debutProchainConges
          this.vigile.debutConge = dateDeSesCongesCetteAnnee;
        }
      }
    }
  }

  calculerConges() {
    const annee = new Date().getFullYear();
    if (this.vigile.dateEntree && !this.vigile.debutConge) {
      const dateDebutConges = new Date(this.vigile.dateEntree);
      if (new Date(this.vigile.dateEntree).getFullYear() === new Date().getFullYear()) {
        dateDebutConges.setFullYear(annee + 1);
      } else {
        dateDebutConges.setFullYear(annee);
      }
      this.vigile.debutConge = dateDebutConges;
      let dateFinConges = new Date(dateDebutConges);
      dateFinConges.setDate(dateFinConges.getDate() + 21);
      this.vigile.finConge = dateFinConges;
    }
    if (this.vigile.debutConge) {
      let dateFinConges = new Date(this.vigile.debutConge);

      let joursConges = 0;
      while (joursConges < 14 + this.dette) {
        dateFinConges.setDate(dateFinConges.getDate() + 1);
        const jourDeLaSemaine = dateFinConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
      this.vigile.finConge = dateFinConges;
    }
  }

  calculerFin() {
    if (this.debutConge) {
      let dateFinConges = new Date(this.debutConge);

      let joursConges = 0;
      while (joursConges < this.dette) {
        dateFinConges.setDate(dateFinConges.getDate() + 1);
        const jourDeLaSemaine = dateFinConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
      this.finConge = dateFinConges;
    }
  }

  save() {
    console.log('this.vigile.debutConge');
    console.log(this.vigile.debutConge);
    this.vigile.detteConges = this.dette;
    this.vigile.debutConge = new Date(this.vigile.debutConge);
    this.vigile.finConge = new Date(this.vigile.finConge);
    this.vigileService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Modification effectuée avec succès");
      // this.router.navigate(['vigile']);
    })
  }

  saveDette() {

  }

  getRemplacementsConges(vigile: Vigile) {
    const remplacements = new Array<Vigile>();
    if (vigile) {
      this.vigiles.forEach((v) => {
        if (v.idremplacantConge) {
          if (v.idremplacantConge.idvigile === vigile.idvigile) {
            remplacements.push(v);
          }
        }
      });
    }
    return remplacements;
  }

  getDisponibilite(vigile: Vigile, debut: Date, fin: Date) {

  }

  getNombreJoursOuvrees(vigile: Vigile) {
    let joursConges = 0;
    if (vigile.debutConge && vigile.finConge) {
      const dateDebutConges = new Date(vigile.debutConge);
      const dateFinConges = new Date(vigile.finConge);
      while (dateFinConges.getTime() > dateDebutConges.getTime() && joursConges < 30) {
        dateDebutConges.setDate(dateDebutConges.getDate() + 1);
        const jourDeLaSemaine = dateDebutConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
    }
    return joursConges
  }

  getNombreJoursOuvreesEntreDeuxDates(debut: Date, fin: Date) {
    let joursConges = 0;
    if (debut && fin) {
      const dateDebutConges = new Date(debut);
      const dateFinConges = new Date(fin);
      while (dateFinConges.getTime() > dateDebutConges.getTime() && joursConges < 30) {
        dateDebutConges.setDate(dateDebutConges.getDate() + 1);
        const jourDeLaSemaine = dateDebutConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
    }
    return joursConges
  }

  openModal() {
    console.log('open modal remplacantconges');
    const modale = document.getElementById('remplacantconges');

    console.log(modale);
    if (modale != null) {
      this.myModal = new bootstrap.Modal(modale);
      this.myModal.show();
    }
  }

  supprimerRemplacant() {
    this.vigile.idremplacantConge = null;
  }

  declarerConges() {
    console.log('open modal congeModal');
    const modale = document.getElementById('congeModal');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  enregistrerUnConge() {

  }

  verifierAucunCongeDansLaPeriode(conge: Conge) {
    let resultat = false;
    this.conges.forEach((c) => {
      if (new Date(c.dateDebut).getTime() < new Date(conge.dateDebut).getTime() && new Date(conge.dateDebut).getTime() < new Date(c.dateFin).getTime()) {
        resultat = true;
      }
      if (new Date(c.dateDebut).getTime() < new Date(conge.dateFin).getTime() && new Date(conge.dateFin).getTime() < new Date(c.dateFin).getTime()) {
        resultat = true;
      }
    });
    return !resultat;
  }

  getJoursRestantsParAnnee(c: Conge) {
    let joursConsommes = 0;
    const an = new Date(c.dateDebut).getFullYear();
    this.conges.forEach((conge) => {
      if (new Date(conge.dateDebut).getFullYear() === an) {
        joursConsommes += this.getNombreJoursOuvreesEntreDeuxDates(conge.dateDebut, conge.dateFin)
      }
    });
    return joursConsommes;
  }

  calculerDette() {
    let joursConsommes = 0;
    const an = new Date().getFullYear();
    this.conges.forEach((conge) => {
      if (new Date(conge.dateDebut).getFullYear() === an) {
        joursConsommes += this.getNombreJoursOuvreesEntreDeuxDates(conge.dateDebut, conge.dateFin)
      }
    });
    return joursConsommes;
  }

  saveConge() {
    const conge = new Conge();
    conge.dateDebut = new Date(this.debutConge);
    conge.dateFin = new Date(this.finConge);
    conge.idvigile = this.vigile;
    if (conge.dateFin.getTime() > conge.dateDebut.getTime()) {
      if (this.verifierAucunCongeDansLaPeriode(conge)) {
        this.congeService.ajouter('vigileconge', conge).then(() => {
    
        });
      } else {
        alert('Un congé est déjà enregistré dans la période');
      }
    } else {
      alert('Erreur de date');
    }
  }
}
