import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Motif } from 'src/app/models/motif.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-motif-edit',
  templateUrl: './motif-edit.component.html',
  styleUrls: ['./motif-edit.component.scss']
})
export class MotifEditComponent implements OnInit {

  motif = new Motif();
  villes = new Array<any>();
  processing = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private motifService: JarvisService<any> ,
    private villeService: JarvisService<any>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.motifService.get('motif', Number(id)).then((motif) => {
          console.log('motif');
          console.log(motif);
          this.motif = motif;
        });
      }
    });
  }

  save() {
    console.log(this.motif);
    if (this.motif.idmotif == 0) {
      this.processing = true;
      this.motifService.ajouter('motif', this.motif).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Ajout effectué avec succès");
        this.router.navigate(['motif']);
      });
    } else {
      this.processing = true;
      this.motifService.modifier('motif', this.motif.idmotif, this.motif).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Modification effectuée avec succès");
        this.router.navigate(['motif']);
      });
    }
  }

  supprimer() {
    const reponse = confirm("Etes-vous sûr de vouloir supprimer cet élément ?");
    if (reponse) {
      this.processing = true;
      this.motifService.supprimer('motif', this.motif.idmotif).then((data)=>{
        console.log('data');
        console.log(data);
        this.processing = false;
        this.notifierService.notify('success', "Suppression effectuée avec succès");
        this.router.navigate(['motif']);
      });
    }
  }

}
