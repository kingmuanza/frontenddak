import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poste } from 'src/app/models/poste.model';

@Component({
  selector: 'app-display-poste',
  templateUrl: './display-poste.component.html',
  styleUrls: ['./display-poste.component.scss']
})
export class DisplayPosteComponent implements OnInit {

  @Input() poste = new Poste();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigate(['poste', 'edit', this.poste.idposte]);
  }
}
