import { Component, OnInit } from '@angular/core'; 

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
