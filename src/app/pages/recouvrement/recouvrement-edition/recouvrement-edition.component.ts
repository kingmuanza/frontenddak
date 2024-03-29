import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Permission } from 'src/app/models/permission.model';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-recouvrement-edition',
  templateUrl: './recouvrement-edition.component.html',
  styleUrls: ['./recouvrement-edition.component.scss']
})
export class RecouvrementEditionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  permission = new Permission();
  processing = false;
  postes = new Array<any>();
  vigiles = new Array<any>();
  permissionAffectee = new Permission();
  permissionsAffectees = new Array<any>();
  permissions = new Array<any>();

  etape = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private permissionService: JarvisService<Permission>,
    private jarvisService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('permission').then((data) => {
      console.log('data');
      console.log(data);
      this.permissions = data;
    });
    this.getVigiles().then((vigiles) => {
      this.vigiles = vigiles;
      this.route.paramMap.subscribe((paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.permissionService.get('permission', Number(id)).then((permission) => {
            console.log('le permission recupéré');
            console.log(permission);
            this.permission = permission;

            this.vigiles.forEach((v) => {
              if (v.idvigile === permission.idvigile?.idvigile) {
                permission.idvigile = v;
              }
            });
          });
        } else {
          this.permission.date = new Date();
        }
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

  async save() {
    console.log('this.permission');
    console.log(this.permission);
    this.permission.dateDebut = new Date(this.permission.dateDebut!);
    this.permission.dateFin = new Date(this.permission.dateFin!);
    setTimeout(() => {
      if (this.permission.idpermission === 0) {
        this.processing = true;
        this.jarvisService.ajouter('permission', this.permission).then((data) => {
          console.log('data');
          console.log(data);
          this.processing = false;
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['permission']);
        }).catch((e) => {
          this.processing = false;
        });
      } else {
        this.processing = true;
        this.jarvisService.modifier('permission', this.permission.idpermission, this.permission).then((data) => {
          console.log('data');
          console.log(data);
          this.processing = false;
          this.notifierService.notify('success', "Ajout effectué avec succès");
          this.router.navigate(['permission']);
        }).catch((e) => {
          this.processing = false;
        });
      }
    }, 500);
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('permission', this.permission.idpermission).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['permission']);
      });
    }
  }

  jourSemaine(jour: any) {
    return this.permissionService.jourSemaine(jour);
  }

  getNombrePermissionJour(poste: Poste): number {
    const dernieresPermissions = new Array<any>();
    this.permissions.forEach((permission) => {
      if (permission.idposte.idposte === poste.idposte && !permission.arret) {
        if (permission.horaire.toLowerCase() === 'jour') {
          dernieresPermissions.push(permission);
        }
      }
    });
    return dernieresPermissions.length;
  }

  getNombrePermissionNuit(poste: Poste): number {
    const dernieresPermissions = new Array<any>();
    this.permissions.forEach((permission) => {
      if (permission.idposte.idposte === poste.idposte && !permission.arret) {
        if (permission.horaire.toLowerCase() === 'nuit') {
          dernieresPermissions.push(permission);
        }
      }
    });
    return dernieresPermissions.length;
  }

}
