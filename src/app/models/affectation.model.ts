import { Vigile } from "./vigile.model";

export class Affectation {
    idaffectation = 0;
    idposte: any;
    idvigile!: Vigile;
    dateAffectation: any = new Date();
    arret: any;
    horaire = '';
    jourRepos = '';
    remplacant: any;
}