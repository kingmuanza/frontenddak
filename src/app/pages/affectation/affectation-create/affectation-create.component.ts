import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-affectation-create',
  templateUrl: './affectation-create.component.html',
  styleUrls: ['./affectation-create.component.scss']
})
export class AffectationCreateComponent implements OnInit {
  @ViewChild('vigileElement') vigileElement!: ElementRef<HTMLElement>;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  affectation = new Affectation();
  processing = false;
  postes = new Array<any>();
  vigiles = new Array<any>();
  remplacants = new Array<any>();
  affectationAffectee = new Affectation();
  affectationsAffectees = new Array<any>();
  affectations = new Array<Affectation>();
  affectationsDuPoste = new Array<Affectation>();

  canNotBeAffectation = false;
  leVigileEstVacant = false;

  etape = 1;

  affectationAArreterACauseDuPoste = new Affectation();
  affectationAArreterACauseDuVigile = new Affectation();
  affectationAArreterACauseDuRemplacant = new Affectation();

  zone = new ZoneDak();
  zones = new Array<ZoneDak>();

  rechercheVigile = "";
  rechercheRemplacant = "";

  vigilesSubject = new Subject<Array<Vigile>>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private affectationService: JarvisService<Affectation>,
    private posteService: JarvisService<Poste>,
    private zoneService: JarvisService<ZoneDak>,
    private vigileService: VigileService,
  ) { }

  ngOnInit(): void {
    this.vigilesSubject = this.vigileService.vigilesSubject;
    this.affectationService.getAll('affectation').then((data) => {
      console.log('data');
      console.log(data);
      this.affectations = data;
    });
    this.zoneService.getAll('zone').then((data) => {
      console.log('data');
      console.log(data);
      this.zones = data;
    });
    this.getPostes(this.zone).then((postes) => {
      this.postes = postes;
    });
  }

  setListePostes(zone: ZoneDak) {
    this.getPostes(zone).then((postes) => {
      this.postes = postes.sort((a, b) => {
        return a.libelle > b.libelle ? 1 : -1;
      });
    });
  }

  getPostes(zone: ZoneDak): Promise<Array<Poste>> {
    return new Promise((resolve, reject) => {
      this.posteService.getAll('poste').then((data) => {
        const postes = new Array<Poste>();
        console.log('postes');
        console.log(postes);
        data.forEach((poste) => {
          if (poste.zone.idzone == zone.idzone) {
            postes.push(poste);
          }
        });
        resolve(postes);
      });
    });
  }

  getVigiles(texte: string) {
    this.vigileService.rechercheCalme(texte).then((vigiles) => {
      this.vigiles = vigiles;
    });
  }

  getRemplacants(texte: string) {
    this.vigileService.rechercheCalme(texte).then((vigiles) => {
      this.remplacants = vigiles;
    });
  }

  terminerEtape1() {
    let valide = true;
    if (this.affectation.idposte && this.affectation.idvigile && this.affectation.dateAffectation) {
      if (this.affectation.idaffectation === 0) {
        console.log('affectation à enregistrer');
        console.log(this.affectation);
        console.log(this.affectation);
        this.affectationsAffectees = new Array<any>();
        this.affectationService.getAll('affectation').then((affectations) => {
          console.log('affectations');
          console.log(affectations);
          affectations.forEach((aff) => {
            if (aff.idvigile.idvigile === this.affectation.idvigile.idvigile && !aff.arret) {
              this.affectationsAffectees.push(aff);
              if (aff.idposte.idposte == this.affectation.idposte.idposte) {
                if (this.affectation.idaffectation == 0) {
                  valide = false;
                }
              }
            }
          });
          console.log('affectationsAffectees');
          console.log(this.affectationsAffectees);
          if (valide) {
            this.etape = 2;
          } else {
            if (this.affectation.idaffectation == 0) {
              alert('Le vigile a déjà été affecté à ce poste');
            }
          }
        });
      } else {
        this.save();
      }
    } else {
      this.notifierService.notify('error', "Veuillez renseigner une date, un vigile et un poste");
    }
  }

  impactNouvelleAffectation(horaire: string): number {
    if (horaire == this.affectation.horaire) {
      return 1;
    } else {
      return 0;
    }
  }

  annuler() {
    this.etape = 1;
  }

  async save() {
    this.affectation.horaire = this.affectation.idposte.horaire;

    if (this.affectation.dateAffectation)
      this.affectation.dateAffectation = new Date(this.affectation.dateAffectation);

    if (this.affectation.idaffectation == 0) {

      if (this.affectation.idposte && this.affectation.idvigile && this.affectation.dateAffectation) {
        let dateArret = await this.arreterLesAffectationsAArreter();
        if (dateArret) {
          this.affectation.arret = dateArret;
        }
        await this.affectationService.ajouter('affectation', this.affectation);
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['affectation']);
      } else {
        this.notifierService.notify('error', "Veuillez renseigner une date, un vigile et un poste");
      }
    }
  }

  async arreterLesAffectationsAArreter(): Promise<Date | undefined> {
    let dateArret: Date | undefined;
    if (this.affectationAArreterACauseDuPoste.idaffectation !== 0) {
      if (this.toJour(this.affectationAArreterACauseDuPoste.dateAffectation) < this.toJour(this.affectation.dateAffectation)) {
        this.affectationAArreterACauseDuPoste.arret = new Date();
        await this.affectationService.modifier('affectation', this.affectationAArreterACauseDuPoste.idaffectation, this.affectationAArreterACauseDuPoste);
      } else {
        dateArret = new Date(this.affectationAArreterACauseDuPoste.dateAffectation);
      }
    }
    if (this.affectationAArreterACauseDuVigile.idaffectation !== 0) {
      if (this.toJour(this.affectationAArreterACauseDuVigile.dateAffectation) < this.toJour(this.affectation.dateAffectation)) {
        this.affectationAArreterACauseDuVigile.arret = new Date();
        await this.affectationService.modifier('affectation', this.affectationAArreterACauseDuVigile.idaffectation, this.affectationAArreterACauseDuVigile);
      } else {
        dateArret = new Date(this.affectationAArreterACauseDuVigile.dateAffectation);
      }
    }
    if (this.affectationAArreterACauseDuRemplacant.idaffectation !== 0) {
      if (this.toJour(this.affectationAArreterACauseDuRemplacant.dateAffectation) < this.toJour(this.affectation.dateAffectation)) {
        this.affectationAArreterACauseDuRemplacant.arret = new Date();

        const affectationSansRemplacant = new Affectation()
        affectationSansRemplacant.idposte = this.affectationAArreterACauseDuRemplacant.idposte;
        affectationSansRemplacant.idvigile = this.affectationAArreterACauseDuRemplacant.idvigile;
        affectationSansRemplacant.dateAffectation = new Date();
        affectationSansRemplacant.horaire = this.affectationAArreterACauseDuRemplacant.horaire;

        await this.affectationService.modifier('affectation', this.affectationAArreterACauseDuRemplacant.idaffectation, this.affectationAArreterACauseDuRemplacant);

        console.log('affectationSansRemplacant');
        console.log(affectationSansRemplacant);

        await this.affectationService.ajouter('affectation', affectationSansRemplacant);

      } else {
        dateArret = new Date(this.affectationAArreterACauseDuRemplacant.dateAffectation);
      }
    }
    return dateArret
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.affectationService.supprimer('affectation', this.affectation.idaffectation).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['affectation']);
      });
    }
  }

  jourSemaine(jour: number | string) {
    return this.affectationService.jourSemaine(Number(jour))
  }

  getNombreAffectationJour(poste: Poste): number {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'jour') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations.length;
  }

  getNombreAffectationNuit(poste: Poste): number {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'nuit') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations.length;
  }

  retirerRemplacant() {
    this.affectation.remplacant = null;
  }

  isNotVacant(poste: Poste, is: boolean) {
    console.log('poste.libelle');
    console.log(poste.libelle);
    console.log(is);
    this.canNotBeAffectation = is;
    this.getAffectationEncoursDuPoste(poste);
  }

  getAffectationEncoursDuPoste(poste: Poste) {
    let affectationsDuPoste = new Array<Affectation>();
    this.affectations.forEach((affectation) => {
      if (!affectation.arret) {
        if (affectation.idposte && poste) {
          if (affectation.idposte.idposte === poste.idposte) {
            affectationsDuPoste.push(affectation);
          }
        }
      }
    });
    this.affectationsDuPoste = affectationsDuPoste;
  }

  isVigileVacant(ev: any) {
    this.leVigileEstVacant = ev;
  }

  estDejaAffecteAuPoste(vigile: Vigile): boolean {
    if (vigile) {
      let resultat = false;
      this.affectationsDuPoste.forEach((aff) => {
        if (aff.idvigile.idvigile === vigile.idvigile) {
          resultat = true;
        }
      });
      return resultat;
    } else {
      return false;
    }
  }

  getAffectationActuelle(vigile: Vigile): Affectation | null {
    let affectation: Affectation | null;
    affectation = null;
    this.affectations.forEach((aff) => {
      if (!aff.arret && aff.idvigile.idvigile === vigile.idvigile) {
        affectation = aff;
      }
    });
    if (affectation) {
      this.affectationAArreterACauseDuVigile = affectation;
    } else {
      this.affectationAArreterACauseDuVigile = new Affectation();
    }
    return affectation;
  }

  getAffectationActuelleRemplacant(vigile: Vigile, jour: number): Affectation | null {
    let affectation: Affectation | null;
    affectation = null;
    this.affectations.forEach((aff) => {
      if (!aff.arret && aff.remplacant.idvigile === vigile.idvigile && aff.idvigile.jourRepos === jour) {
        affectation = aff;
      }
    });

    if (affectation) {
      this.affectationAArreterACauseDuRemplacant = affectation;
    } else {
      this.affectationAArreterACauseDuRemplacant = new Affectation();
    }
    return affectation;
  }

  setAffectationACauseDuPoste(item?: Affectation) {
    if (item) {
      this.affectationAArreterACauseDuPoste = item;
    } else {
      this.affectationAArreterACauseDuPoste = new Affectation();
    }
  }

  toJour(d: Date): number {
    const date = new Date(d);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  }
}
