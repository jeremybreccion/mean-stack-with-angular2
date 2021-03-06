import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
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

export class UserDetails {
  email: string;
  nickname: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      //client side/network error occurred
      console.log('client side error occured');
    } else {
      console.log('error from server: ' + error.status + '\n' + error.error);
    }

    return throwError(error);
  }

  constructor(private http: HttpClient) { 
    alert('auth service constructor');
    /* this.current().subscribe(
      (res: any) => {
        alert('got user data');
        this.setToken(res.token);
      },
      err => {
        console.log(err);
      }); */
  }

  //if ng serve is used, you must declare the node server address
  domain = 'http://localhost:8080';
  httpOptions;

  //this will be checked by auth-guard
  isLoggedIn = false;
  //redirect if not authenticated
  redirectUrl;


  register(registerDetails: RegisterDetails): Observable<RegisterDetails> {
    return this.http.post<RegisterDetails>(this.domain + '/users/register', registerDetails)
    .pipe(catchError(this.handleError));
  }

  login(loginDetails: LoginDetails): Observable<LoginDetails> {
    return this.http.post<LoginDetails>(this.domain + '/users/login', loginDetails)
    .pipe(catchError(this.handleError));
  }

  current(): Observable<any> {
    return this.http.get<any>(this.domain + '/users/current').pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.domain + '/users/logout').pipe(catchError(this.handleError));
  }

  //is called only during successful login. attach httpOptions to routes that need authentication
  setToken(token: string) {
    this.isLoggedIn = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
  }
}
