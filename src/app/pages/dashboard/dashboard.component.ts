import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Permission } from 'src/app/models/permission.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { CalculService } from 'src/app/services/calcul.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { BesoinVigile } from 'src/app/structures/besoin.vigile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  sanctions = new Array<any>();
  permissions = new Array<Permission>();
  zones = new Array<ZoneDak>();

  postes = new Array<Poste>();
  resultatsPostes = new Array<Poste>();

  vigiles = new Array<Vigile>();
  resultats = new Array<Vigile>();

  vigile: any;
  poste: any;
  horaire: any;

  besoinVigile = new BesoinVigile();

  terminee = false;

  mot = '';
  afficherResultats = false;
  afficherResultatsPostes = false;

  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  public barChartType = 'bar';
  public barChartLegend = true;

  semaines = [0, 0, 0, 0, 0, 0, 0];
  afficher = false;

  public barChartData = [
    { data: this.semaines, label: 'Jours de repos', backgroundColor: '#E3B505' },
  ];


  constructor(
    private router: Router,
    private calculService: CalculService,
    private zoneService: JarvisService<ZoneDak>,
    private posteService: JarvisService<Poste>,
    private vigileService: JarvisService<Vigile>,
    private sanctionService: JarvisService<any>,
    private permissionService: JarvisService<Permission> ,
  ) { }

  ngOnInit(): void {
    this.posteService.getAll('poste').then((data)=> {
      this.postes = data;
    });
    this.vigileService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      data.forEach((vigile) => {
        if (vigile.jourRepos) {
          if (vigile.jourRepos > 1) {
            this.semaines[vigile.jourRepos - 1] += 1;
          }
        }
      });
      console.log('this.semaines');
      console.log(this.semaines);
      this.afficher = true;
      this.dtTrigger.next('');
      this.vigiles = data;
    });
    this.calculService.getBesoinVigiles().then((besoinVigile) => {
      this.besoinVigile = besoinVigile;
      this.terminee = true;
    });

    this.zoneService.getAll('zone').then((zones) => {
      console.log('data');
      console.log(zones);
      this.zones = zones;
    });

    this.sanctionService.getAll('suiviposte').then((suiviposte) => {
      console.log('suiviposte');
      console.log(suiviposte);
      this.sanctions = suiviposte;
    });
    this.permissionService.getAll('permission').then((permissions) => {
      console.log('permission');
      console.log(permissions);
      this.permissions = permissions;
    });
  }

  groupByVille() {
    
  }


  goToPostesVacants() {
    this.router.navigate(['vacant', 'poste']);
  }

  goToZone(zone: ZoneDak) {
    this.router.navigate(['fiche', 'planning-incomplet', zone.idzone]);
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

  rechercher() {
    this.rechercherPoste();
    this.rechercherVigile();
  }

  rechercherVigile() {
    this.afficherResultats = true;
    console.log('Recherche en cours');
    let mot = '';
    if (this.vigile) {
      mot = this.vigile as string;
    }
    console.log(mot);
    this.resultats = this.vigiles.filter((v) => {
      const isBonNom = v.noms.toLowerCase().indexOf(mot.toLowerCase()) !== -1;
      const isBonPoste = this.poste;
      return isBonNom;
    });
  }

  rechercherPoste() {
    this.afficherResultatsPostes = true;
    console.log('Recherche en cours');
    let mot = '';
    if (this.poste) {
      mot = this.poste as string;
    }
    console.log(mot);
    this.resultatsPostes = this.postes.filter((p) => {
      const isBonLibelle = p.libelle.toLowerCase().indexOf(mot.toLowerCase()) !== -1;
      const isBonCode = p.code.toLowerCase().indexOf(mot.toLowerCase()) !== -1;
      return isBonLibelle || isBonCode;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
