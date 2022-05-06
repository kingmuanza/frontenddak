import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { VigiProp } from 'src/app/models/vigile.prop';

@Component({
  selector: 'app-vacant-remplacant-list',
  templateUrl: './vacant-remplacant-list.component.html',
  styleUrls: ['./vacant-remplacant-list.component.scss']
})
export class VacantRemplacantListComponent implements OnInit, OnDestroy {

  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;

  listeJoursRepos: number[] = [];

  vigiles = new Array<Vigile>();
  vigilesPropositions = new Array<VigiProp>();
  affectations = new Array<Affectation>();
  affectationsSansRemplacants = new Array<Affectation>();
  affectationsPropositions = new Array<{ affectation: Affectation, affectee: boolean }>();



  constructor(
    private router: Router,
    private jarvisService: JarvisService<Vigile>,
    private affectationService: JarvisService<Affectation>
  ) { }

  ngOnInit(): void {
    this.jarvisService.getAll('vigile').then((data) => {
      console.log('data');
      console.log(data);
      this.vigiles = [];
      data.forEach((vigile) => {
        if (vigile.estRemplacant) {
          const v = new Vigile();
          v.copy(vigile);
          this.vigiles.push(v);
        }
      });
      this.getAffectations().then(() => {
        this.affectations.sort((a, b) => {
          return a.idvigile.jourRepos - b.idvigile.jourRepos > 0 ? 1 : -1;
        });
        this.affectations.forEach((a) => {
          this.affectationsPropositions.push({
            affectation: a,
            affectee: false
          })
        });

        this.vigiles.forEach((v) => {
          const vigiProp = new VigiProp(this.getScore(v.jourRepos), v);
          this.vigilesPropositions.push(vigiProp);
        });
        this.dtTrigger.next('');
        this.repartir();
      });
    });
  }

  repartir() {
    this.vigilesPropositions.sort((a,b) => {
      return a.score - b.score > 0 ? 1: -1
    });
    this.vigilesPropositions.forEach((vigiProp) => {
      this.affectationsPropositions.forEach((aff) => {
        if (!aff.affectee) {
          if (!this.estDejaLa(aff.affectation, vigiProp) && aff.affectation.idvigile.jourRepos !== vigiProp.vigile.jourRepos) {
            vigiProp.affectations.push(aff.affectation);
            aff.affectee = true;
          }
        }
      });
    });
  }

  isRepos(vigile: Vigile, jour: number):boolean {
    if (vigile.jourRepos === jour) {
      return true;
    } else {
      return false;
    }
  }

  estDejaLa(
    affectation: Affectation,
    vigiProp: { score: number, vigile: Vigile, affectations: Array<Affectation> }
  ): boolean {
    let estDejaLa = false;
    vigiProp.affectations.forEach((aff) => {
      if (aff.idvigile.jourRepos === affectation.idvigile.jourRepos) {
        estDejaLa = true;
      }
    });
    return estDejaLa;
  }

  reorganiser() {
    this.openModal();
    console.log('reorganiser');
    
  }

  openModal() {

    console.log('open modal suggestion');
    const modale = document.getElementById('suggestion');

    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }
  }

  getAffectationJour(vigile: Vigile, jour: number): Affectation {
    const dernieresAffectations = new Array<any>();
    this.affectations.forEach((affectation) => {
      if (affectation.remplacant.idvigile === vigile.idvigile && !affectation.arret) {
        if (affectation.idvigile.jourRepos === jour) {
          dernieresAffectations.push(affectation);
        }
      }
    });
    if (dernieresAffectations.length > 0) {
      return dernieresAffectations[0];
    } else {
      return new Affectation();
    }
  }

  getAffectations(): Promise<void> {
    this.affectations = [];
    return new Promise((resolve, reject) => {
      this.affectationService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        data.forEach((aff) => {
          if (!aff.arret) {
            this.affectations.push(aff);
            this.listeJoursRepos.push(aff.idvigile.jourRepos)
            if (!aff.remplacant) {
              this.affectationsSansRemplacants.push(aff)
            }
          }
        });
        resolve();
      });
    });
  }

  getScore(repos: number): number {
    let count = 0;
    this.listeJoursRepos.forEach((jour) => {
      if (jour === repos) {
        count++;
      }
    });
    return count;
  }

  edit(id: string) {
    this.router.navigate(['vigile', 'edit', id]);
  }

  libellePrime(libelle: string) {
    if (libelle)
      return "OUI";

    return "NON";
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
