import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register/register-client/register-client.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterUserClientComponent } from './components/register/register-user-client/register-user-client.component';
import { RegisterAdminComponent } from './components/register/register-admin/register-admin.component';
import { RegisterUserAdminComponent } from './components/register/register-user-admin/register-user-admin.component';
export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register-client',component:RegisterClientComponent},
    {path:'register-user-client', component:RegisterUserClientComponent},
    {path:'register-admin', component:RegisterAdminComponent},
    {path:'register-user-admin', component:RegisterUserAdminComponent},

    {path:'**',component:ErrorComponent}
];