export class Suivi {
    idsuiviPoste = 0;
    dateSuivi: any;
    dateEffet= new Date();
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
        this.dateSuivi = new Date().toISOString().split('T')[0];
    }
} 