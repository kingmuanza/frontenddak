import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  zone = new ZoneDak();
  villes = new Array<any>();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private zoneService: JarvisService<any> ,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.villeService.getAll('ville').then((data) => {
      console.log('data');
      console.log(data);
      this.villes = data;
    });
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.zoneService.get('zone', Number(id)).then((zone) => {
          console.log('zone');
          console.log(zone);
          this.zone = zone;
        });
      }
    });
  }

  save() {
    console.log(this.zone);
    if (this.zone.idzone == 0) {
      this.processing = true;
      this.zoneService.ajouter('zone', this.zone).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['zone']);
      });
    } else {
      this.processing = true;
      this.zoneService.modifier('zone', this.zone.idzone, this.zone).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['zone']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.zoneService.supprimer('zone', this.zone.idzone).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['zone']);
      });
    }
  }

}
