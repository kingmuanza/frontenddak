import { Injectable } from '@angular/core';
import { Affectation } from '../models/affectation.model';
import { Poste } from '../models/poste.model';
import { Vigile } from '../models/vigile.model';
import { JarvisService } from './jarvis.service';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(
    private crud: JarvisService<Affectation>
  ) { }

  affecter(vigile: Vigile, poste: Poste, remplacant: Vigile) {

  }

  verifierDisponibiliteVigile() {

  }

  verifierDisponibiliteRemplacant() {
    
  }

  mettreFinAffectation() {
    
  }
}
