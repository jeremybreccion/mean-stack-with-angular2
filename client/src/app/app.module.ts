import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

import { SnackbarService } from './services/snackbar.service';

import { 
  MatButtonModule, 
  MatToolbarModule, 
  MatCardModule, 
  MatInputModule,
  MatFormFieldModule ,
  MatSnackBarModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { AppRouterModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ValidateEqualDirective } from './directives/validate-equal.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ValidateEqualDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SnackbarService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
