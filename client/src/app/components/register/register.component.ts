import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';


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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    delete form.value.confirmPassword;
    //use the form.value not the class itself
    this.httpService.register(form.value).subscribe(() => {
      console.log('added');
    });
  }

}
