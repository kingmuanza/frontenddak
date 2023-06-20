export class Vigile {
    idvigile = 0;
    matricule = "";
    numero = "";
    noms = "";
    nom = "";
    prenom = "";
    dteNce = new Date();
    mumCni = "";
    ville: any;
    nationalite: any;
    quartier: any;
    zone: any;
    tel = "";
    horaire = "";
    fonction = "AGENT";
    dateEntree = new Date();
    dateSortie: Date = new Date(2050, 5, 15);
    debutConge = new Date();
    finConge = new Date();
    statut = "";
    jourRepos = 0;
    parrain: any;
    estRemplacant = false;
    estRemplacantConge = false;
    idremplacantConge: any;
    image = '';
    badge = false;
    detteConges = 0;
    enLigne = false;
    dateEnLigne = new Date();

    constructor() {
        let dateLimite = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 18 * 365);
        this.dteNce = dateLimite;
    }

    static getDateLimite() {
        return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 18 * 365);
    }

    copy(vigile: Vigile) {
        this.idvigile = vigile.idvigile;
        this.matricule = vigile.matricule;
        this.numero = vigile.numero;
        this.nom = vigile.nom;
        this.prenom = vigile.prenom;
        this.noms = vigile.noms;
        this.dteNce = vigile.dteNce;
        this.mumCni = vigile.mumCni;
        this.ville = vigile.ville;
        this.nationalite = vigile.nationalite;
        this.quartier = vigile.quartier;
        this.zone = vigile.zone;
        this.tel = vigile.tel;
        this.horaire = vigile.horaire;
        this.fonction = vigile.fonction;
        this.dateEntree = vigile.dateEntree;
        this.dateSortie = vigile.dateSortie;
        this.debutConge = vigile.debutConge;
        this.finConge = vigile.finConge;
        this.statut = vigile.statut;
        this.jourRepos = vigile.jourRepos;
        this.parrain = vigile.parrain;
        this.estRemplacant = vigile.estRemplacant;
        this.estRemplacantConge = vigile.estRemplacantConge ? vigile.estRemplacantConge : false;
    }


}