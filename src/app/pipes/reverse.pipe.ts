import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  /**
   * @value - строка
   * @reverse - обратно в нормальный вид строки
   */
  transform(value: string, noReverse?: boolean) {
    if (!noReverse) {
      return value.split('').reverse().join('');
    }
    return value;
  }

}
