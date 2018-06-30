import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'; 

/**
 * How to use:
 * e.g. passwords
 * //legit password
 * <input type="password" matInput placeholder="Password" [(ngModel)]="registerClass.password" name="password" #password="ngModel"
          appValidateEqual validateEqual="confirmPassword" reverse="true" required>
  //confirm password
 * <input type="password" matInput placeholder="Confirm Password" [(ngModel)]="tempConfirmPassword" name="confirmPassword" #confirmPassword="ngModel"
          appValidateEqual validateEqual="password" required>

    //basically, use appValiadteEqual & validateEqual input on both values. use reverse input on the original or intended value
 */



@Directive({
  selector: '[appValidateEqual]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateEqualDirective,
    multi: true
  }]
})

export class ValidateEqualDirective implements Validator {

  constructor() { }

  //directive input 
  @Input() validateEqual: string;
  @Input() reverse: string;

  private isReverse() {
    return (this.reverse === 'true') ? true : false;
  }

  validate(self: AbstractControl): { [key: string]: any } | null {

    //get the compareTo input (e.g. password)
    let compareTo = self.root.get(this.validateEqual);

    //input mismatch
    if(compareTo && self.value !== compareTo.value && !this.isReverse()) {
      //send error equal set to true
      return { equal: true };
    }

    //input match
    if(compareTo && self.value === compareTo.value && this.isReverse()) {
      //delete errors
      delete self.errors['equal'];
      //
      if(!Object.keys(self.errors).length) {
        self.setErrors(null);
      }
    }

    //input mismatch
    if(compareTo && self.value !== compareTo.value && this.isReverse()) {
      compareTo.setErrors({ equal: true });
    }

    return null;
  }

}
