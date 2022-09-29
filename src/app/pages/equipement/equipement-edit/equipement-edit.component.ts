import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Equipement } from 'src/app/models/equipement.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-equipement-edit',
  templateUrl: './equipement-edit.component.html',
  styleUrls: ['./equipement-edit.component.scss']
})
export class EquipementEditComponent implements OnInit {

  equipement = new Equipement();
  villes = new Array<any>();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private equipementService: JarvisService<any> ,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.equipementService.get('equipement', Number(id)).then((equipement) => {
          console.log('equipement');
          console.log(equipement);
          this.equipement = equipement;
        });
      }
    });
  }

  save() {
    console.log(this.equipement);
    if (this.equipement.idequipement == 0) {
      this.processing = true;
      this.equipementService.ajouter('equipement', this.equipement).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['equipement']);
      });
    } else {
      this.processing = true;
      this.equipementService.modifier('equipement', this.equipement.idequipement, this.equipement).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['equipement']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.equipementService.supprimer('equipement', this.equipement.idequipement).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['equipement']);
      });
    }
  }

}
