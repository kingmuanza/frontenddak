import { Client } from "./client.model";

export class Contrat {
    idcontrat = 0;
    libelle = '';
    localisation = '';
    reference = '';
    description = '';
    dateSignature = new Date();
    dateDebut = new Date();
    dateFin: Date | undefined;
    montant = 0;
    
    nbPostes = 0;
    nbVigileJour = 0;
    nbVigileNuit = 0;

    nom = '';
    raison = '';
    representant = '';
    prenom = '';
    noms = '';
    tel = '';
    email = '';
    cni = '';
    adresse = '';
    numero = '';
    particulier = true;

    idparent: any;
    date = new Date();

    bon = false;
}