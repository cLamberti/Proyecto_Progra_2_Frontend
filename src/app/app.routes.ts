import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AdViajeComponent } from './components/ad-viaje/ad-viaje.component';
export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'registro-client',component:RegisterClientComponent},
    {path:'registro-user', component:RegisterUserComponent},
    {path: 'ad-viaje', component:AdViajeComponent},
    {path:'**',component:ErrorComponent}
];
