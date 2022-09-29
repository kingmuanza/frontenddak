import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Client } from 'src/app/models/client.model';
import { Contrat } from 'src/app/models/contrat.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-contrat-edit',
  templateUrl: './contrat-edit.component.html',
  styleUrls: ['./contrat-edit.component.scss']
})
export class ContratEditComponent implements OnInit {

  contrat = new Contrat();
  avenants = new Array<any>();
  processing = true;

  nbVigileNuit = 0;
  nbVigileJour = 0;
  nbPostes = 0;
  description = '';

  contrats = new Array<Contrat>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private contratService: JarvisService<Contrat>,
    private clientService: JarvisService<Client>,
    private avenantService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.getContrat(id).then((contrat) => {
          console.log('contrat');
          console.log(contrat);
          this.contrat = contrat;

          this.nbVigileNuit = contrat.nbVigileNuit + 0;
          this.nbVigileJour = contrat.nbVigileJour + 0;
          this.nbPostes = contrat.nbPostes + 0;
          this.description = contrat.description + ''; 

          this.contratService.getAll('contrat').then((data) => {
            console.log('data');
            console.log(data);
            this.contrats = data.filter((contrat) => {
              return contrat.idparent && contrat.idparent.idcontrat === this.contrat.idcontrat;
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

  save() {
    console.log('contrat à enregistrer');
    console.log(this.contrat);
    console.log(this.contrat);
    this.contrat.noms = this.contrat.nom + ' ' + this.contrat.prenom

    if (this.contrat.dateDebut)
      this.contrat.dateDebut = new Date(this.contrat.dateDebut);

    if (this.contrat.dateFin)
      this.contrat.dateFin = new Date(this.contrat.dateFin);

    if (this.contrat.dateSignature)
      this.contrat.dateSignature = new Date(this.contrat.dateSignature);

    if (this.contrat.idcontrat == 0) {
      if (this.contrat.libelle) {
        this.processing = true;
        this.ajouter(this.contrat);
      } else {
        this.notifierService.notify('error', "Veuillez renseigner un code et un libellé");
      }
    } else {
      this.processing = true;
      this.modifier();
    }
  }

  ajouter(contrat: Contrat) {
    this.contratService.ajouter('contrat', contrat).then((data) => {
      console.log('data');
      console.log(data);
      this.notifierService.notify('success', "Ajout effectué avec succès");
      this.router.navigate(['contrat']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  modifier() {
    if (
      this.contrat.nbPostes === this.nbPostes &&
      this.contrat.nbVigileJour === this.nbVigileJour &&
      this.contrat.description === this.description &&
      this.contrat.nbVigileNuit === this.nbVigileNuit
    ) {

      this.contratService.modifier('contrat', this.contrat.idcontrat, this.contrat).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");

        this.router.navigate(['contrat']);
      }).catch((e) => {
        this.processing = false;
      });
    } else {
      const date = new Date(this.contrat.date);
      this.contrat.date = new Date();
      this.contratService.modifier('contrat', this.contrat.idcontrat, this.contrat).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.createFils(date);

      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  createFils(date: Date) {
    const fils = JSON.parse(JSON.stringify(this.contrat));
    fils.idparent = this.contrat;
    fils.nbPostes === this.nbPostes;
    fils.nbVigileJour === this.nbVigileJour;
    fils.description === this.description;
    fils.nbVigileNuit === this.nbVigileNuit;
    fils.date = date;
    this.ajouter(fils);
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.contratService.supprimer('contrat', this.contrat.idcontrat).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['contrat']);
      });
    }
  }

  choisirClient(choix: number) {
    setTimeout(() => {
      if (choix === 0) {
        this.contrat.particulier = true;
      } else {
        this.contrat.particulier = false;
      }
    }, 250);
  }
}
