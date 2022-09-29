import { Component, Input, OnInit } from '@angular/core';
import { EquipementVigile } from 'src/app/models/equipement.vigile.model';

@Component({
  selector: 'app-display-equipement',
  templateUrl: './display-equipement.component.html',
  styleUrls: ['./display-equipement.component.scss']
})
export class DisplayEquipementComponent implements OnInit {

  @Input() equipement!: EquipementVigile;
  constructor() { }

  ngOnInit(): void {
  }

}
