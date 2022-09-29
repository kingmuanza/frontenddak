import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Quartier } from 'src/app/models/quartier.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-quartier-edit',
  templateUrl: './quartier-edit.component.html',
  styleUrls: ['./quartier-edit.component.scss']
})
export class QuartierEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  quartier = new Quartier;
  processing = false;
  zones = new Array<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.getZones().then((zones) => {
      this.zones = zones;
      this.route.paramMap.subscribe((paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.jarvisService.get('quartier', Number(id)).then((quartier) => {
            console.log('quartier');
            console.log(quartier);
            this.quartier = quartier;

            zones.forEach((z) => {
              if (this.quartier.idzone) {
                if (this.quartier.idzone.idzone === z.idzone) {
                  this.quartier.idzone = z;
                }
              }
            });
          });
        }
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

  save() {
    if (this.quartier.idquartier == 0) {
      this.processing = true;
      this.jarvisService.ajouter('quartier', this.quartier).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['quartier']);
      });
    } else {
      this.processing = true;
      this.jarvisService.modifier('quartier', this.quartier.idquartier, this.quartier).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['quartier']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('quartier', this.quartier.idquartier).then((data) => {
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['quartier']);
      });
    }
  }

}
