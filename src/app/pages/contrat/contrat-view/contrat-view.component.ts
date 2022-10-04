import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from 'src/app/models/contrat.model';
import { Poste } from 'src/app/models/poste.model';
import { PosteVigile } from 'src/app/models/poste.vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-contrat-view',
  templateUrl: './contrat-view.component.html',
  styleUrls: ['./contrat-view.component.scss']
})
export class ContratViewComponent implements OnInit {

  contrat = new Contrat();
  avenants = new Array<any>();
  postes = new Array<Poste>();
  postesVigiles = new Array<PosteVigile>();

  contrats = new Array<Contrat>();
  myModal?: bootstrap.Modal;

  poste = new Poste();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratService: JarvisService<Contrat>,
    private posteService: JarvisService<Poste>,
    private avenantService: JarvisService<any>,
    private notifierService: NotifierService,
    private postevigileService: JarvisService<PosteVigile>,
  ) { }

  ngOnInit(): void {
    this.getDemandesVigiles().then((postesVigiles) => {
      this.postesVigiles = postesVigiles;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getContrat(id).then((contrat) => {
          this.contrat = contrat;
          
          this.contratService.getAll('contrat').then((data) => {
            console.log('data');
            console.log(data);
            this.contrats = data.filter((contrat) => {
              return contrat.idparent && contrat.idparent.idcontrat === this.contrat.idcontrat;
            });
          });

          this.getPostes().then((postes) => {
            this.postes = postes;
            if (postes.length === this.contrat.nbPostes) {
              this.contrat.bon = true;
            } else {
              this.contrat.bon = false;
            }
            this.contratService.modifier('contrat', this.contrat.idcontrat, contrat).then((data) => {                
            });
          });
        });
      }
      
    });
  }

  getContrat(id: string): Promise<Contrat> {
    return new Promise((resolve, reject) => {
      this.contratService.get('contrat', Number(id)).then((contrat) => {
        console.log('contrat');
        console.log(contrat);
        resolve(contrat);
      });
    });
  }

  getAvenants(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.avenantService.getAll('contratavenant').then((avenants) => {
        console.log('avenants');
        console.log(avenants);
        resolve(avenants);
      });
    });
  }

  getPostes(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.posteService.getAll('poste').then((postes) => {
        postes = postes.filter((poste) => {
          return poste.idcontrat && poste.idcontrat.idcontrat === this.contrat.idcontrat;
        });
        resolve(postes);
      });
    });
  }
  
  getDemandesVigiles(): Promise<Array<PosteVigile>> {
    return new Promise((resolve, reject) => {
      this.postevigileService.getAll('postevigile').then((postevigiles) => {
        console.log('postevigiles');
        console.log(postevigiles);
        resolve(postevigiles);
      });
    });
  }

  openModal() {
    console.log('open modal creation poste');
    const modale = document.getElementById('posteModal');

    console.log(modale);
    if (modale != null) {
      this.myModal = new bootstrap.Modal(modale);
      this.myModal.show();
    }
  }

  savePoste() {
    console.log('poste à enregistrer');
    console.log(this.poste);
    this.poste.idcontrat = this.contrat;
    if (this.poste.debutContrat)
      this.poste.debutContrat = new Date(this.poste.debutContrat);

    if (this.poste.finContrat)
      this.poste.finContrat = new Date(this.poste.finContrat);

    if (this.poste.idposte == 0) {
      if (this.poste.code && this.poste.libelle) {
        this.posteService.ajouter('poste', this.poste).then((data) => {
          console.log('data');
          console.log(data);
          this.notifierService.notify('success', "Ajout effectué avec succès");
          window.location.reload();
        }).catch((e) => {
        });
      } else {
        this.notifierService.notify('error', "Veuillez renseigner un code et un libellé");
      }
    }
  }

}
