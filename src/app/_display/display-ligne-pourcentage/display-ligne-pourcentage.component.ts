import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-ligne-pourcentage',
  templateUrl: './display-ligne-pourcentage.component.html',
  styleUrls: ['./display-ligne-pourcentage.component.scss']
})
export class DisplayLignePourcentageComponent implements OnInit, OnChanges {

  @Input() fraction = 0;
  @Input() couleur = "";

  pourcentage = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.pourcentage = Math.min(this.fraction * 100, 100);
  }

  ngOnInit(): void {
    this.pourcentage = Math.min(this.fraction * 100, 100);
  }



}
