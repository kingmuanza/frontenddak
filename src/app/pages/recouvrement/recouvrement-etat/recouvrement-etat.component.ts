import { Component, OnInit } from '@angular/core';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';

@Component({
  selector: 'app-recouvrement-etat',
  templateUrl: './recouvrement-etat.component.html',
  styleUrls: ['./recouvrement-etat.component.scss']
})
export class RecouvrementEtatComponent implements OnInit {
  dtOptions: any = DatatablesOptions;
  constructor() { }

  ngOnInit(): void {
  }

}
