import {FormControl} from '@angular/forms';

export class CustomValidators {
  constructor() {}

  isFirstCharUpperCase(control: FormControl): {[s: string]: boolean} {
    if (control.value !== null && control.value !== '') {
      const isUpper = control.value[0] === control.value[0].toUpperCase();
      if (!isUpper) {
        return {isUpper: true};
      } else {
        return null;
      }
    }
  }
}
