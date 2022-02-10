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
  vigile = new Vigile();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private jarvisService: JarvisService<any> 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.jarvisService.get('vigile', Number(id)).then((vigile) => {
          console.log('vigile');
          console.log(vigile);
          this.vigile = vigile;
        });
      }
    });
  }

  save() {
    if (this.vigile.idvigile == 0) {
      this.processing = true;
      this.jarvisService.ajouter('vigile', this.vigile).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['vigile']);
      });
    } else {
      this.processing = true;
      this.jarvisService.modifier('vigile', this.vigile.idvigile, this.vigile).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['vigile']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.jarvisService.supprimer('vigile', this.vigile.idvigile).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['vigile']);
      });
    }
  }

}
