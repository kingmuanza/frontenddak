import { Pipe, PipeTransform } from '@angular/core';
import { Vigile } from '../models/vigile.model';

@Pipe({
  name: 'actifs'
})
export class ActifsPipe implements PipeTransform {

  transform(value: Array<Vigile>, ...args: unknown[]): Array<Vigile> {
    return value.filter((vigile) => {
      if (vigile) {
        if (vigile.statut != null && vigile.statut != undefined) {
          let s = 0;
          try {
            s = Number(vigile.statut);
          } catch (e) {

          }
          return s < 3;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
  }

}
