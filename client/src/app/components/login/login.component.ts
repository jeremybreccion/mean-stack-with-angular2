import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    //use the form.value not the class itself
    this.authService.login(form.value).subscribe(
      //put any to ignore LoginDetails class
      (res: any) => {
        console.log('logged in');
        this.snackbarService.openSimpleSnackBar('Welcome, ' + res.nickname + '!');
        this.router.navigateByUrl('/main/home');
      },
      err => {
        console.log('error', err);
        //AUTH_FAIL is a self-written object sent from server
        this.snackbarService.openSimpleSnackBar((err.error.AUTH_FAIL) ? 'Username/Password incorrect!' : 'Error occurred');
      }
    );
  }
}
