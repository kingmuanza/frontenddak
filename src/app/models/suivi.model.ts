import { Vigile } from "./vigile.model";

export class Suivi {
    idsuiviPoste = 0;
    dateSuivi = new Date();
    dateEffet = new Date();
    horaire = '';
    commentaire = '';
    numero = '';
    zone?: Zone;
    poste: any;
    idvigile!: Vigile;
    remplacant: any;
    nombreAbsence = 0;
    motifSanction = '';

    constructor() {
    }
} 