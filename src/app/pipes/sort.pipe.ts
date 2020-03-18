import { Pipe, PipeTransform } from '@angular/core';
import {Recipe} from '../recipes/recipe-list/recipe.model';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {
  /**
   * @value - рецепт
   * @reverse - по возрастанию или по убыванию
   */
  transform(value: Recipe[], reverse?: boolean): Recipe[] {
    let status = -1;
    reverse ? status = 1 : status = -1;
    return value.sort((prev, next) => {
      if (prev.name < next.name) {
        return status;
      } else {
        return status;
      }
    });
  }

}
