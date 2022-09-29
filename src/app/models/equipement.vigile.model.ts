import { Equipement } from "./equipement.model";
import { Vigile } from "./vigile.model";

export class EquipementVigile {
    idequipementVigile = '0';
    idequipement = new Equipement();
    idvigile = new Vigile();
    quantite = 0;

    constructor(vigile: Vigile, equipement: Equipement) {
        this.idequipementVigile = vigile.idvigile + '-' + equipement.idequipement;
        this.idvigile = vigile;
        this.idequipement = equipement;
    }
}