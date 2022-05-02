import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { Ville } from 'src/app/models/ville.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-ville-edit',
  templateUrl: './ville-edit.component.html',
  styleUrls: ['./ville-edit.component.scss']
})
export class VilleEditComponent implements OnInit {

  ville = new Ville();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private villeService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.villeService.get('ville', Number(id)).then((ville) => {
          console.log('ville');
          console.log(ville);
          this.ville = ville;
        });
      }
    });
  }

  save() {
    console.log(this.ville);
    if (this.ville.idville == 0) {
      this.processing = true;
      this.villeService.ajouter('ville', this.ville).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['ville']);
      });
    } else {
      this.processing = true;
      this.villeService.modifier('ville', this.ville.idville, this.ville).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['ville']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.villeService.supprimer('ville', this.ville.idville).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['ville']);
      });
    }
  }

}
