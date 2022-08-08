import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-poste-edit',
  templateUrl: './poste-edit.component.html',
  styleUrls: ['./poste-edit.component.scss']
})
export class PosteEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  poste = new Poste();
  processing = false;
  zones = new Array<any>();
  quartiers = new Array<any>();
  affectations = new Array<any>();
  affVigilesJour = 0;
  affVigilesNuit = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[0, 'desc']]
    };
    this.getVilles().then((zones) => {
      this.zones = zones;
      this.getNationalites().then((quartiers) => {
        this.quartiers = quartiers;
        this.route.paramMap.subscribe((paramMap) => {
          const id = paramMap.get('id');
          if (id) {
            this.jarvisService.get('poste', Number(id)).then((poste) => {
              console.log('le poste recupéré');
              console.log(poste);
              this.poste = poste;

              this.poste.debutContrat = poste.debutContrat?.split('T')[0];
              this.poste.finContrat = poste.finContrat?.split('T')[0];

              this.jarvisService.getAll('affectation').then((data) => {
                console.log('data');
                console.log(data);
                data.forEach((affectation) => {
                  if (affectation.idposte.idposte === poste.idposte) {
                    this.affectations.push(affectation);
                  }
                });
                this.affVigilesJour = 0;
                this.affVigilesNuit = 0;
                this.affectations.forEach((aff) => {
                  if (!aff.arret) {
                    let horaire: string;
                    horaire = aff.horaire;
                    if (horaire.toLocaleLowerCase() == 'jour') {
                      this.affVigilesJour += 1;
                    }
                    if (horaire.toLocaleLowerCase() == 'nuit') {
                      this.affVigilesNuit += 1;
                    }
                  }
                });
                this.dtTrigger.next('');
              });

              zones.forEach((zone) => {
                if (this.poste.zone && zone.idzone == this.poste.zone.idzone) {
                  this.poste.zone = zone;
                }
              });
              quartiers.forEach((quartier) => {
                if (this.poste.idquartier && quartier.idquartier == this.poste.idquartier.idquartier) {
                  this.poste.idquartier = quartier;
                }
              });
            });
          }
        });
      });
    });
  }

  getVilles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('zone').then((zones) => {
        console.log('zones');
        console.log(zones);
        resolve(zones);
      });
    });
  }

  getNationalites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('quartier').then((quartiers) => {
        console.log('quartiers');
        console.log(quartiers);
        resolve(quartiers);
      });
    });
  }

  save() {
    console.log('poste à enregistrer');
    console.log(this.poste);
    this.poste.libelle = this.poste.code;
    if (this.poste.debutContrat)
      this.poste.debutContrat = new Date(this.poste.debutContrat);

    if (this.poste.finContrat)
      this.poste.finContrat = new Date(this.poste.finContrat);

    if (this.poste.idposte == 0) {
      if (this.poste.code && this.poste.libelle) {
        this.processing = true;
        this.jarvisService.ajouter('poste', this.poste).then((data) => {
          console.log('data');
          console.log(data);
          this.processing = false;
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['poste']);
        }).catch((e) => {
          this.processing = false;
        });
      } else {
        this.notifierService.notify('error', "Veuillez renseigner un code et un libellé");
      }
    } else {
      this.processing = true;
      this.jarvisService.modifier('poste', this.poste.idposte, this.poste).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['poste']);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('poste', this.poste.idposte).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['poste']);
      });
    }
  }

  edit(id: string) {
    this.router.navigate(['affectation', 'edit', id]);
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
