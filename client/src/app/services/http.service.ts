import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class RegisterDetails {
  email: string;
  nickname: string;
  password: string;
}

export class LoginDetails {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      //client side/network error occurred
      console.log('client side error occured');
    } else {
      console.log('error from server: ' + error.status + '\n' + error.error);
    }

    return throwError(error);
  }

  constructor(private http: HttpClient) { }

  //if ng serve is used, you must declare the node server address
  domain = 'http://localhost:8080';


  register (registerDetails: RegisterDetails): Observable<RegisterDetails> {
    return this.http.post<RegisterDetails>(this.domain + '/users/register', registerDetails)
    .pipe(catchError(this.handleError));
  }

  login (loginDetails: LoginDetails): Observable<LoginDetails> {
    return this.http.post<LoginDetails>(this.domain + '/users/login', loginDetails)
    .pipe(catchError(this.handleError));
  }
}
