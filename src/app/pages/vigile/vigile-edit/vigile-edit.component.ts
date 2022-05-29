import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vigile-edit',
  templateUrl: './vigile-edit.component.html',
  styleUrls: ['./vigile-edit.component.scss']
})
export class VigileEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  affectations = new Array<any>();
  quartiers = new Array<any>();

  vigile = new Vigile();
  processing = false;
  villes = new Array<any>();
  vigiles = new Array<any>();
  zones = new Array<any>();
  nationalites = new Array<any>();

  url: any;

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
    this.getZones().then((zones) => {
      this.zones = zones;
      this.getQuartiers().then((quartiers) => {
        this.quartiers = quartiers;
        this.getVilles().then((villes) => {
          this.villes = villes;
          this.getNationalites().then((nationalites) => {
            this.nationalites = nationalites;
            this.route.paramMap.subscribe((paramMap) => {
              const id = paramMap.get('id');
              if (id) {
                this.jarvisService.get('vigile', Number(id)).then((vigile) => {
                  console.log('le vigile recupéré');
                  this.vigile = new Vigile();
                  this.vigile.copy(vigile);
                  if (!this.vigile.nom) {
                    this.vigile.nom = this.vigile.noms;
                  }
                  console.log(this.vigile);

                  this.vigile.dateEntree = vigile.dateEntree?.split('T')[0];
                  this.vigile.dateSortie = vigile.dateSortie?.split('T')[0];
                  this.vigile.dteNce = vigile.dteNce?.split('T')[0];

                  this.jarvisService.getAll('affectation').then((data) => {
                    console.log('data');
                    console.log(data);
                    data.forEach((affectation) => {
                      if (affectation.idvigile.idvigile === vigile.idvigile) {
                        this.affectations.push(affectation);
                      }
                    });
                    this.dtTrigger.next('');
                  });

                  villes.forEach((ville) => {
                    if (this.vigile.ville && ville.idville == this.vigile.ville.idville) {
                      this.vigile.ville = ville;
                    }
                  });

                  zones.forEach((zone) => {
                    if (this.vigile.zone && zone.idzone == this.vigile.zone.idzone) {
                      this.vigile.zone = zone;
                    }
                  });

                  nationalites.forEach((nationalite) => {
                    if (this.vigile.nationalite && nationalite.idnationalite == this.vigile.nationalite.idnationalite) {
                      this.vigile.nationalite = nationalite;
                    }
                  });
                });
              }
            });
          });
        });
      });
    });

    this.getVigiles().then((vigiles) => {
      this.vigiles = vigiles;
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

  getVilles(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('ville').then((villes) => {
        console.log('villes');
        console.log(villes);
        resolve(villes);
      });
    });
  }

  getNationalites(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('nationalite').then((nationalites) => {
        console.log('nationalites');
        console.log(nationalites);
        resolve(nationalites);
      });
    });
  }

  getQuartiers(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('quartier').then((quartiers) => {
        console.log('quartiers');
        console.log(quartiers);
        resolve(quartiers);
      });
    });
  }

  getZones(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('zone').then((zones) => {
        console.log('zones');
        console.log(zones);
        resolve(zones);
      });
    });
  }

  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
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
      while (joursConges < 14) {
        dateFinConges.setDate(dateFinConges.getDate() + 1);
        const jourDeLaSemaine = dateFinConges.getDay();
        if (jourDeLaSemaine !== 0 && jourDeLaSemaine !== 6) {
          joursConges++;
        }
      }
      this.vigile.finConge = dateFinConges;
    }
  }

  save() {
    console.log('vigile à enregistrer');
    console.log(this.vigile);
    if (this.vigile.dteNce) {
      this.vigile.dteNce = new Date(this.vigile.dteNce);
    }
    if (this.vigile.dateEntree) {
      this.vigile.dateEntree = new Date(this.vigile.dateEntree);
    }
    if (this.vigile.dateSortie) {
      this.vigile.dateSortie = new Date(this.vigile.dateSortie);
    }

    if (this.vigile.debutConge) {
      this.vigile.debutConge = new Date(this.vigile.debutConge);
    }
    if (this.vigile.finConge) {
      this.vigile.finConge = new Date(this.vigile.finConge);
    }

    this.vigile.noms = this.vigile.nom ? this.vigile.nom : '' ;
    this.vigile.noms = this.vigile.noms + ' ' + (this.vigile.prenom ? this.vigile.prenom: '');
    if (this.vigile.idvigile == 0) {
      this.processing = true;
      this.jarvisService.ajouter('vigile', this.vigile).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['vigile']);
      }).catch((e) => {
        this.processing = false;
      });
    } else {
      this.processing = true;
      this.jarvisService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['vigile']);
      }).catch((e) => {
        this.processing = false;
      });
    }
  }

  remplacant() {
    this.processing = true;
    this.vigile.estRemplacant = true;
    this.jarvisService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  unRemplacant() {
    this.processing = true;
    this.vigile.estRemplacant = false;
    this.jarvisService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data) => {
      console.log('data');
      console.log(data);
      this.processing = false;
      this.notifierService.notify('success', "Modification effectuée avec succès");
      this.router.navigate(['vigile']);
    }).catch((e) => {
      this.processing = false;
    });
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('vigile', this.vigile.idvigile).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['vigile']);
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
