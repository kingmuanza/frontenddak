import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Nationalite } from 'src/app/models/nationalite.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-nationalite-edit',
  templateUrl: './nationalite-edit.component.html',
  styleUrls: ['./nationalite-edit.component.scss']
})
export class NationaliteEditComponent implements OnInit {

  nationalite = new Nationalite();
  villes = new Array<any>();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private nationaliteService: JarvisService<any> ,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.nationaliteService.get('nationalite', Number(id)).then((nationalite) => {
          console.log('nationalite');
          console.log(nationalite);
          this.nationalite = nationalite;
        });
      }
    });
  }

  save() {
    console.log(this.nationalite);
    if (this.nationalite.idnationalite == 0) {
      this.processing = true;
      this.nationaliteService.ajouter('nationalite', this.nationalite).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['nationalite']);
      });
    } else {
      this.processing = true;
      this.nationaliteService.modifier('nationalite', this.nationalite.idnationalite, this.nationalite).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['nationalite']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.nationaliteService.supprimer('nationalite', this.nationalite.idnationalite).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['nationalite']);
      });
    }
  }

}
