import { Contrat } from "./contrat.model";
import { Quartier } from "./quartier.model";

export class ContratSite {
    idcontratSite = 0;
    description = '';
    localisation = '';
    nom = '';
    personne = '';
    tel = '';
    idquartier: Quartier | undefined;
    longitude = 0;
    latitude = 0;
    longitude1 = 0;
    latitude1 = 0;
    longitude2 = 0;
    latitude2 = 0;
    idcontrat = new Contrat();
}