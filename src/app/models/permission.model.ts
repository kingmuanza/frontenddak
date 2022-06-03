import { Vigile } from "./vigile.model";

export class Permission {
    idpermission = 0;
    commentaire = "";
    date = new Date();
    dateDebut?: Date;
    dateFin?: Date;
    idvigile?: Vigile;
}