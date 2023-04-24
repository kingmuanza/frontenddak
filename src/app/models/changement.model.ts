export class Changement {
    date = new Date();
    idaffectation: any;
    idswitch = 0;
    idvigileBase: any;
    idvigileSwitch: any;
    idresponsable?: {
        idresponsable: string,
        noms: string,
        poste: string,
    }
    statut = "En attente"
}