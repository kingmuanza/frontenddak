export class Suivi {
    idsuiviPoste = 0;
    dateSuivi = new Date();
    dateEffet = new Date();
    horaire = '';
    commentaire = '';
    numero = '';
    zone?: Zone;
    poste: any;
    idvigile: any;
    remplacant: any;
    nombreAbsence = 0;
    motifSanction = '';

    constructor() {
    }
} 