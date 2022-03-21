import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Poste } from 'src/app/models/poste.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-vacant-list',
  templateUrl: './vacant-list.component.html',
  styleUrls: ['./vacant-list.component.scss']
})
export class VacantListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  postes = new Array<any>();
  affectations = new Array<any>();

  constructor(
    private router: Router,
    private jarvisService: JarvisService<any>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('poste').then((data) => {
      console.log('data');
      console.log(data);
      this.postes = [];
      data.forEach((poste) => {
        if (poste.contrat == 'ENCOURS') {
          this.postes.push(poste);
        }
      });
      this.getAffectations().then(() => {
        this.dtTrigger.next('');
      });
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  getNombreAffectationJour(poste: Poste): number {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'jour') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations.length;
  }

  getNombreAffectationNuit(poste: Poste): number {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.idposte.idposte === poste.idposte && !affectation.arret) {
        if (affectation.horaire.toLowerCase() === 'nuit') {
          dernieresAffectations.push(affectation);
        }
      }
    });
    return dernieresAffectations.length;
  }

  getAffectations(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.jarvisService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        this.affectations = data;
        resolve();
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['poste', 'edit', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

}
