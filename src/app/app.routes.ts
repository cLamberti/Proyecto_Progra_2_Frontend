import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register/register-client/register-client.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterUserClientComponent } from './components/register/register-user-client/register-user-client.component';
import { RegisterAdminComponent } from './components/register/register-admin/register-admin.component';
import { RegisterUserAdminComponent } from './components/register/register-user-admin/register-user-admin.component';
import { UserProfileComponent } from './components/gestionUsuarios/user-profile/user-profile.component';
import { UsersComponent } from './components/gestionUsuarios/users/users.component';
import { AdViajeComponent } from './components/ad-viaje/ad-viaje.component';
import { NewTravelDetailComponent } from './components/travel-detail/new-travel-detail/new-travel-detail.component';
import { ListTravelDetailsComponent } from './components/travel-detail/list-travel-details/list-travel-details.component';
import { SearchTravelDetailComponent } from './components/travel-detail/search-travel-detail/search-travel-detail.component';
import { UpdateTravelDetailComponent } from './components/travel-detail/update-travel-detail/update-travel-detail.component';
import { DeleteTravelDetailComponent } from './components/travel-detail/delete-travel-detail/delete-travel-detail.component';
import { AdProveedoresComponent } from './components/ad-proveedores/ad-proveedores.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register-client',component:RegisterClientComponent},
    {path:'register-user-client', component:RegisterUserClientComponent},
    {path:'register-admin', component:RegisterAdminComponent},
    {path:'register-user-admin', component:RegisterUserAdminComponent},
    {path:'users', component:UsersComponent},
    {path:'user-profile', component:UserProfileComponent},
    {path: 'ad-viaje', component: AdViajeComponent }, 
    {path:'crear-detalleViaje',component:NewTravelDetailComponent},
    {path:'listar-detalleViaje',component:ListTravelDetailsComponent},    
    {path:'buscar-detalleViaje',component:SearchTravelDetailComponent},
    {path:'actualizar-detalleViaje',component:UpdateTravelDetailComponent},
    {path:'borrar-detalleViaje',component:DeleteTravelDetailComponent},  
    {path: 'ad-proveedores', component: AdProveedoresComponent },  
  
    
    {path:'**',component:ErrorComponent}
];