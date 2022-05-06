import { Affectation } from "./affectation.model";
import { Vigile } from "./vigile.model";

export class VigiProp {
    score: number = 0;
    vigile: Vigile;
    affectations = new Array<Affectation>();

    constructor(score: number, vigile: Vigile) {
        this.score = score;
        this.vigile = vigile;
    }

    getAffectation(jour: number): Affectation {
        let affectation: any;
        this.affectations.forEach((aff) => {
            if (aff.idvigile.jourRepos === jour) {
                affectation = aff;
            }
        });
        return affectation;
    }
}
