import { Directive,forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS,Validator,
  Validators,AbstractControl,ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[compare][formControlName],[compare][formControl],[compare][ngModel]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => CompareValidator), multi: true }
  ]
})
export class CompareValidator implements Validator {
  constructor( @Attribute('compare') public compare: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
     
      let v = c.value;

      
      let e = c.root.get(this.compare);

      // value not equal
      if (e && v !== e.value) return {
          compare: false
      }
      return null;
  }
}
