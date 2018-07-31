import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
    //when type localhost:4200, it will redirect to main/home
    //next step: if not logged in, redirect to login
    {
        path: '',
        redirectTo: 'main/home',
        pathMatch: 'full'
    },
    //for login & register, cannot access if user is already logged in
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'about',
                component: AboutComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },
    {
        path: '**',
        //invalid links return to home, but redirect to login page if cannot activate
        //component: HomeComponent
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {enableTracing: true})],
    exports: [RouterModule]
})
export class AppRouterModule { }