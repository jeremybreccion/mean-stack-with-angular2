import { Component, OnInit } from '@angular/core';

export class LoginDetails {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginClass = new LoginDetails();

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginClass);
  }

}
