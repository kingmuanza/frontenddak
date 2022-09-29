import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Statut } from 'src/app/models/statut.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-statut-edit',
  templateUrl: './statut-edit.component.html',
  styleUrls: ['./statut-edit.component.scss']
})
export class StatutEditComponent implements OnInit {

  statut = new Statut();
  villes = new Array<any>();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private statutService: JarvisService<any> ,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.statutService.get('statut', Number(id)).then((statut) => {
          console.log('statut');
          console.log(statut);
          this.statut = statut;
        });
      }
    });
  }

  save() {
    console.log(this.statut);
    if (this.statut.idstatut == 0) {
      this.processing = true;
      this.statutService.ajouter('statut', this.statut).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['statut']);
      });
    } else {
      this.processing = true;
      this.statutService.modifier('statut', this.statut.idstatut, this.statut).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['statut']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.statutService.supprimer('statut', this.statut.idstatut).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['statut']);
      });
    }
  }

}
