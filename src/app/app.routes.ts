import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterUserClientComponent } from './components/register-user-client/register-user-client.component';
export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register-client',component:RegisterClientComponent},
    {path:'register-user-client', component:RegisterUserClientComponent},

    {path:'**',component:ErrorComponent}
];