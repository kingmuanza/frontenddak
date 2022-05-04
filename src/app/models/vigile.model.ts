export class Vigile {
    idvigile = 0;
    matricule = "";
    numero = "";
    noms = "";
    dteNce = new Date();
    mumCni = "";
    ville: any;
    nationalite: any;
    quartier: any;
    zone: any;
    tel = "";
    horaire = "";
    fonction = "";
    dateEntree = new Date();
    dateSortie = new Date();
    debutConge = new Date();
    finConge = new Date();
    statut = "";
    jourRepos = "";
    parrain = "";
    estRemplacant = false;
    estRemplacantConges = false;

    copy(vigile: Vigile) {
        this.idvigile = vigile.idvigile;
        this.matricule = vigile.matricule;
        this.numero = vigile.numero;
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
        this.estRemplacantConges = vigile.estRemplacantConges ? vigile.estRemplacantConges : false ;
        this.calculerConges();
    }

    calculerConges() {
        const annee = new Date().getFullYear();
        if (this.dateEntree) {
            const dateDebutConges = new Date(this.dateEntree);
            if (new Date(this.dateEntree).getFullYear() === new Date().getFullYear()) {
                dateDebutConges.setFullYear(annee + 1);
            } else {
                dateDebutConges.setFullYear(annee);
            }
            this.debutConge = dateDebutConges;
            let dateFinConges = new Date(dateDebutConges);
            dateFinConges.setDate(dateFinConges.getDate() + 21);
            this.finConge = dateFinConges;
        }
    }

}