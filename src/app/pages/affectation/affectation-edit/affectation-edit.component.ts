import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-affectation-edit',
  templateUrl: './affectation-edit.component.html',
  styleUrls: ['./affectation-edit.component.scss']
})
export class AffectationEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  affectation = new Affectation();
  processing = false;
  postes = new Array<any>();
  vigiles = new Array<any>();
  affectationAffectee = new Affectation();
  affectationsAffectees = new Array<any>();
  affectations = new Array<any>();

  etape = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('affectation').then((data) => {
      console.log('data');
      console.log(data);
      this.affectations = data;
    });
    this.getPostes().then((postes) => {
      this.postes = postes;
      this.getVigiles().then((vigiles) => {
        this.vigiles = vigiles;
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.jarvisService.get('affectation', Number(id)).then((affectation) => {
              console.log('le affectation recupéré');
              console.log(affectation);
              this.affectation = affectation;

              this.affectation.dateAffectation = affectation.dateAffectation?.split('T')[0];
              this.affectation.arret = affectation.arret?.split('T')[0];
              postes.forEach((poste) => {
                if (this.affectation.idposte && poste.idposte == this.affectation.idposte.idposte) {
                  this.affectation.idposte = poste;
                }
              });
              vigiles.forEach((vigile) => {
                if (this.affectation.idvigile && vigile.idvigile == this.affectation.idvigile.idvigile) {
                  this.affectation.idvigile = vigile;
                }
              });
              vigiles.forEach((vigile) => {
                if (this.affectation.remplacant && vigile.idvigile == this.affectation.remplacant.idvigile) {
                  this.affectation.remplacant = vigile;
                }
              });
            });
          } else {
            this.affectation.dateAffectation = new Date().toISOString().split('T')[0];
          }
        });
      });
    });
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('poste').then((data) => {
        const postes = new Array<any>();
        console.log('postes');
        console.log(postes);
        data.forEach((poste) => {
          if (poste.contrat == 'ENCOURS') {
            postes.push(poste);
          }
        });
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

  terminerEtape1() {
    let valide = true;
    if (this.affectation.idposte && this.affectation.idvigile && this.affectation.dateAffectation) {
      console.log('affectation à enregistrer');
      console.log(this.affectation);
      console.log(this.affectation);
      this.affectationsAffectees = new Array<any>();
      this.jarvisService.getAll('affectation').then((affectations) => {
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

    if (this.affectationsAffectees.length > 0) {
      this.processing = true;
      for (let index = 0; index < this.affectationsAffectees.length; index++) {
        const aff = this.affectationsAffectees[index];
        aff.arret = new Date(this.affectation.dateAffectation);
        await this.jarvisService.modifier('affectation', aff.idaffectation, aff);
      }
      this.processing = false;
    }

    if (this.affectation.idaffectation == 0) {
      if (this.affectation.dateAffectation)
        this.affectation.dateAffectation = new Date(this.affectation.dateAffectation);

      if (this.affectation.arret)
        this.affectation.arret = new Date(this.affectation.arret);

      if (this.affectation.idposte && this.affectation.idvigile && this.affectation.dateAffectation) {
        this.processing = true;
        this.jarvisService.ajouter('affectation', this.affectation).then((data) => {
          console.log('data');
          console.log(data);
          this.processing = false;
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['affectation']);
        }).catch((e) => {
          this.processing = false;
        });
      } else {
        this.notifierService.notify('error', "Veuillez renseigner une date, un vigile et un poste");
      }
    } else {
      this.processing = true;
      this.jarvisService.modifier('affectation', this.affectation.idaffectation, this.affectation).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['affectation']);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('affectation', this.affectation.idaffectation).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['affectation']);
      });
    }
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

}
