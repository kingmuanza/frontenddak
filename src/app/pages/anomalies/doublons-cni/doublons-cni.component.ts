import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { VigileCtrlService } from 'src/app/_services/vigile-ctrl-service';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { droits } from 'src/app/data/droits';
import { Vigile } from 'src/app/models/vigile.model';
import { AuthService } from 'src/app/services/auth.service';
import { JarvisService } from 'src/app/services/jarvis.service';
import { VigileService } from 'src/app/services/vigile.service';

@Component({
  selector: 'app-doublons-cni',
  templateUrl: './doublons-cni.component.html',
  styleUrls: ['./doublons-cni.component.scss']
})
export class DoublonsCniComponent implements OnInit {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  vigiles = new Array<Vigile>();
  resultats = new Array<Vigile>();

  mesDroits = droits;

  recherche = "";
  error = false;

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>,
    private vigileCtrlService: VigileCtrlService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe((utilisateur) => {
      console.log('utilisateur');
      console.log(utilisateur);
      if (utilisateur) {
        try {
          this.mesDroits = JSON.parse(utilisateur.droits);
        } catch (error) {
          this.mesDroits = droits;
        }
      }

    });
    this.authService.notifier();
    this.vigileCtrlService.getDuplicatesCNI().then((vigiles) => {
      this.vigiles = vigiles;
      this.resultats = vigiles;
      this.dtTrigger.next("");
    })
  }


  view(id: string | number) {
    this.router.navigate(['vigile', 'view', id]);
  }

  libelleFonction(fonction: string) {
    return this.jarvisService.libelleFonction(fonction);
  }

  libelleStatut(jour: number | string) {
    return this.jarvisService.libelleStatut(jour)
  }


  jourSemaine(jour: number) {
    return this.jarvisService.jourSemaine(jour);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
