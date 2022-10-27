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
    idcontrat = new Contrat();
}