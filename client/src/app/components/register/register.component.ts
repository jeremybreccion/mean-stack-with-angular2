import { Component, OnInit } from '@angular/core'; 

export class RegisterDetails {
  email: string;
  nickname: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerClass = new RegisterDetails();

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.registerClass);
  }

}
