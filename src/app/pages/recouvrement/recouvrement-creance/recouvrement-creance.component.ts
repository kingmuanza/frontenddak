import { Component, OnInit } from '@angular/core';
import { DatatablesOptions } from 'src/app/data/DATATABLES.OPTIONS';

@Component({
  selector: 'app-recouvrement-creance',
  templateUrl: './recouvrement-creance.component.html',
  styleUrls: ['./recouvrement-creance.component.scss']
})
export class RecouvrementCreanceComponent implements OnInit {
  dtOptions: any = DatatablesOptions;
  constructor() { }

  ngOnInit(): void {
  }

}
