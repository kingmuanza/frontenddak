import { AffectationCtrlService } from 'src/app/_services/affectation-ctrl.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';
import { Affectation } from 'src/app/models/affectation.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-tableau-affectations',
  templateUrl: './tableau-affectations.component.html',
  styleUrls: ['./tableau-affectations.component.scss']
})
export class TableauAffectationsComponent implements OnInit, OnChanges, OnDestroy {
  // Datatables
  dtOptions: any = DatatablesOptions;
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtInstance!: Promise<DataTables.Api>;
  @Input()
  vigile!: Vigile;


  affectations = new Array<Affectation>();

  constructor(
    private router: Router,
    private vigileService: JarvisService<Vigile>,
    private affectationService: AffectationCtrlService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.vigile) {
      this.refresh();
    }
  }

  ngOnInit(): void {
    if (this.vigile) {
      this.getAffectionOfVigile(this.vigile).then(() => {
        this.dtTrigger.next('');
      });
    }
  }

  edit(id: string | number) {
    this.router.navigate(['affectation', 'view', id]);
  }

  jourSemaine(jour: number | string) {
    return this.vigileService.jourSemaine(jour);
  }

  getAffectionOfVigile(vigile: Vigile): Promise<void> {
    return new Promise((resolve, reject) => {
      this.affectationService.getAffectationsOfVigile(vigile).then((data) => {
        this.affectations = new Array<Affectation>();
        console.log('data');
        console.log(data);
        data.forEach((affectation) => {
          this.affectations.push(affectation);
        });
        resolve();
      });
    });
  }

  refresh() {
    setTimeout(() => {
      this.getAffectionOfVigile(this.vigile).then(() => {
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next('');
          });
        } else {
          this.dtTrigger.next('');
        }
      });

    }, 500);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
