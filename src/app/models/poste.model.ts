import { Contrat } from "./contrat.model";
import { ContratSite } from "./contrat.site.model";

export class Poste {
    code = '';
    abrege = '';
    contact = '';
    tel = '';
    contrat = 'En ';
    debutContrat = new Date();
    finContrat = new Date();
    idposte = 0;
    note = 0;
    libelle = '';
    nombreVigileJour = 0;
    nombreVigileNuit = 0;
    nombreMC = 0;
    nombreESC = 0;
    nombreRadio = 0;
    prime = true;
    zone: any;
    zoneJour: any;
    zoneNuit: any;
    idquartier: any;
    longitude = 0;
    latitude = 0;
    longitude1 = 0;
    latitude1 = 0;
    longitude2 = 0;
    latitude2 = 0;
    organisme = false;
    description = '';
    bon = false;
    horaire = '';
    idcontratsite: ContratSite | undefined;
    codeagiv = '';
}
