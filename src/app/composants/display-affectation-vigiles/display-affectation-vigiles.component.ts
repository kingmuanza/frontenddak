import { Component, Input, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';

@Component({
  selector: 'app-display-affectation-vigiles',
  templateUrl: './display-affectation-vigiles.component.html',
  styleUrls: ['./display-affectation-vigiles.component.scss']
})
export class DisplayAffectationVigilesComponent implements OnInit {

  @Input()
  affectations = new Array<Affectation>();

  constructor() { }

  ngOnInit(): void {
  }

  toDate(timestp: any): Date | undefined {
    if (timestp && timestp.seconds) {
      return new Date(timestp.seconds * 1000);

    } else {
      return undefined;
    }
  }

}
