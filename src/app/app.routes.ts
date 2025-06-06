import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register/register-client/register-client.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AdViajeComponent } from './components/ad-viaje/ad-viaje.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-client', component: RegisterClientComponent },
  { path: 'registro-user', component: RegisterUserComponent },
  { path: 'ad-viaje', component: AdViajeComponent },
]
import { RegisterUserClientComponent } from './components/register/register-user-client/register-user-client.component';
import { RegisterAdminComponent } from './components/register/register-admin/register-admin.component';
import { RegisterUserAdminComponent } from './components/register/register-user-admin/register-user-admin.component';
import { UserComponent } from './components/gestionUsuarios/user/user.component';
import { UsersComponent } from './components/gestionUsuarios/users/users.component';
import { User } from './models/user';
export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register-client',component:RegisterClientComponent},
    {path:'register-user-client', component:RegisterUserClientComponent},
    {path:'register-admin', component:RegisterAdminComponent},
    {path:'register-user-admin', component:RegisterUserAdminComponent},

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-client', component: RegisterClientComponent },
  { path: 'register-user-client', component: RegisterUserClientComponent },
  { path: 'register-admin', component: RegisterAdminComponent },
  { path: 'register-user-admin', component: RegisterUserAdminComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: ErrorComponent }
];
