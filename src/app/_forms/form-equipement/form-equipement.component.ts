import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Equipement } from 'src/app/models/equipement.model';
import { EquipementVigile } from 'src/app/models/equipement.vigile.model';
import { Vigile } from 'src/app/models/vigile.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-form-equipement',
  templateUrl: './form-equipement.component.html',
  styleUrls: ['./form-equipement.component.scss']
})
export class FormEquipementComponent implements OnInit, OnChanges {

  @Input() vigile = new Vigile();
  @Output() onSaveEvent = new EventEmitter<Vigile>();

  equipements = new Array<Equipement>();
  equipementsVigile = new Array<EquipementVigile>();

  constructor(
    private equipementService: JarvisService<Equipement>,
    private equipementVigileService: JarvisService<EquipementVigile>,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.equipementService.getAll('equipement').then((data1) => {
      /* console.log('equipements');
      console.log(data1); */
      this.equipements = data1;

      this.equipementVigileService.getAll('equipementvigile').then((data) => {
        /* console.log('equipementVigileService');
        console.log(data);
        console.log(this.vigile); */

        if (this.vigile.idvigile !== 0) {

          // On met tout à zéro
          this.equipements.forEach((equipement) => {
            equipement.defaut = 0;
          });

          data.forEach((equipementVigile) => {
            /* console.log(equipementVigile);
            console.log(equipementVigile.idvigile.idvigile);
            console.log(this.vigile.idvigile); */
            if (equipementVigile.idvigile.idvigile === this.vigile.idvigile) {
              this.equipementsVigile.push(equipementVigile);
              
              this.equipements.forEach((equipement) => {
                if (equipement.idequipement === equipementVigile.idequipement.idequipement) {
                  console.log('CA MATCH !!!');
                  equipement.defaut = equipementVigile.quantite;
                }
              });
              
            }
          });
        }
      });

    });
  }

  getQuantite(equipement: Equipement) {
    let qte = 0;
    this.equipementsVigile.forEach((ev) => {
      if (ev.idequipement.idequipement === equipement.idequipement) {
        qte = ev.quantite ? ev.quantite : 0;
      }
    });
    return qte;
  }

  isFormulaireValide(): boolean {
    return true
  }

  afficherLesErreurs() {

  }

  save() {
    this.enregistrerUnAUn().then(() => {
      console.log('Enregistrement terminé');
    });
  }

  async enregistrerUnAUn() {
    if (this.isFormulaireValide()) {
      for (let index = 0; index < this.equipements.length; index++) {
        const equipement = this.equipements[index];
        const equipementVigile = new EquipementVigile(this.vigile, equipement);
        equipementVigile.quantite = equipement.defaut;

        await this.equipementVigileService.ajouter('equipementvigile', equipementVigile);
      }
    } else {
      this.afficherLesErreurs();
    }
  }

}
