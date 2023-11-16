import { Component, OnInit, Input } from '@angular/core';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-suggestions-affectations-poste',
  templateUrl: './suggestions-affectations-poste.component.html',
  styleUrls: ['./suggestions-affectations-poste.component.scss']
})
export class SuggestionsAffectationsPosteComponent implements OnInit {

  @Input() suggestions = new Array<Affectation>();
  constructor(
    private affectationService: JarvisService<Affectation>,
  ) { }

  ngOnInit(): void {
  }

  creerAffectation(aff: Affectation) {
    aff.arret = null;
    if (aff.remplacant.idvigile === 0) {
      aff.remplacant = null;
    }
    // this.closeModal("suggestions");
    this.affectationService.ajouter("affectation", aff).then(() => {
      window.location.reload();
    });
  }

}
