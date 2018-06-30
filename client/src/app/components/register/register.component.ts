import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SnackbarService } from '../../services/snackbar.service';


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

  constructor(private httpService: HttpService, private snackbarService: SnackbarService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    delete form.value.confirmPassword;
    //use the form.value not the class itself
    this.httpService.register(form.value).subscribe(
      data => {
        console.log('added');
        this.snackbarService.openSimpleSnackBar('Account registered!');
      },
      err => {
        console.log('error', err);
        this.snackbarService.openSimpleSnackBar('Error occurred!');
      }
    );
  }

}
