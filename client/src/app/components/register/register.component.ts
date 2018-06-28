import { Component, OnInit } from '@angular/core'; 
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core/src/metadata/directives';

/**
 * password validation directive (can be separated in a file to be used by other components)
 * to properly generate directives, run 'ng g directive [directive-name]'
 * 
 *
 */
 ///////////




export class RegisterDetails {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerClass = new RegisterDetails();
  //emailFormControl = new FormControl(this.registerClass.email, [Validators.required, Validators.email]);


  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.registerClass);
  }

}
