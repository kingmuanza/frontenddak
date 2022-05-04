export class Suivi {
    idsuiviPoste = 0;
    dateSuivi: any;
    horaire = '';
    commentaire = '';
    numero = '';
    zone?: Zone;
    poste: any;
    idvigile: any;
    remplacant: any;
    nombreAbsence = 0;

    constructor() {
        this.dateSuivi = new Date().toISOString().split('T')[0];
    }
} 