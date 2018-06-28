import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'; 

//how to use in an input field: [appValudateEqual] validateEqual="password" //name of the input control to be compared to
@Directive({
  selector: '[appValidateEqual]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateEqualDirective,
    multi: true
  }]
})

export class ValidateEqualDirective implements Validator{

  constructor() { }

  //directive input 
  @Input() validateEqual: string;

  validate(confirm: AbstractControl): { [key: string]: any } | null {

    //get the original input (e.g. password)
    let original = confirm.root.get(this.validateEqual);

    return (original && confirm.value !== original.value) ? {equal: true} : null;
  }

}
