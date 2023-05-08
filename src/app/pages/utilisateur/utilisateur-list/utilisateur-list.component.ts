import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {

  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  utilisateurs = new Array<Utilisateur>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Utilisateur>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('utilisateur').then((data) => {
      console.log('data');
      console.log(data);
      this.utilisateurs = data;
      this.dtTrigger.next('');
    });
  }

  edit(utilisateur: Utilisateur) {
    this.router.navigate(['utilisateur', 'view', utilisateur.idutilisateur]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
