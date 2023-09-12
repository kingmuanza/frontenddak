import { Component, Input, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';

@Component({
  selector: 'app-display-pointages',
  templateUrl: './display-pointages.component.html',
  styleUrls: ['./display-pointages.component.scss']
})
export class DisplayPointagesComponent implements OnInit {

  @Input() pointages = new Array<any>();
  @Input() affectations = new Array<Affectation>();

  constructor() { }

  ngOnInit(): void {
  }


  getAffection(idvigile: number): Affectation | undefined {
    console.log('idvigile');
    console.log(idvigile);
    let affectations = this.affectations.filter((aff) => {
      return aff.idvigile.idvigile == idvigile;
    })
    console.log(affectations[0])
    return affectations[0];
  }


}
