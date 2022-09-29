import { Equipement } from "./equipement.model";
import { Poste } from "./poste.model";

export class PosteEquipement {
    idposteEquipement = 0;
    idequipement!: Equipement;
    idposte!: Poste;
    quantite = 0;
    versionContrat = 0;
}