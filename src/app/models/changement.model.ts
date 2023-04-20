export class Changement {
    date = new Date();
    idaffectation: any;
    idswitch = 0;
    idvigileBase: any;
    idvigileSwitch: any;
    responsable?: {
        idresponsable: string,
        noms: string,
        poste: string,
    }
    statut = "En attente"
}