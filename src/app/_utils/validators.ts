import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';



export class CustomValidators {
  static matchPasswordValidator(pwd: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlToCompare = control.root.get(pwd);
      if (controlToCompare) {
        const subscription: Subscription = controlToCompare.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }
      return controlToCompare && controlToCompare.value !== control.value ? { 'compare': true } : null;
    };
  }
}




