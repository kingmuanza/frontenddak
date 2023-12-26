import { Poste } from "./poste.model";
import { Vigile } from "./vigile.model";

export class Affectation {
  idaffectation = 0;
  idposte = new Poste();
  idvigile!: Vigile;
  dateAffectation: any = new Date();
  arret: any;
  horaire = '';
  jourRepos = '';
  remplacant: any;
}
