import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


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

  constructor(private httpService: HttpService, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    delete form.value.confirmPassword;
    //use the form.value not the class itself
    this.httpService.register(form.value).subscribe(
      (res: any) => {
        console.log('added');
        this.snackbarService.openSimpleSnackBar('Account registered!');
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log('error', err);
        this.snackbarService.openSimpleSnackBar('Error occurred!');
      }
    );
  }

}
