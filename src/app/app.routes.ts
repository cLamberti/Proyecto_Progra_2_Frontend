import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register/register-client/register-client.component';
import { ErrorComponent } from './components/error/error.component';

import { NewProviderComponent } from './components/new-provider/new-provider.component';
import { ListProvidersComponent } from './components/list-providers/list-providers.component';
import { SearchProviderComponent } from './components/search-provider/search-provider.component';
import { UpdateProviderComponent } from './components/update-provider/update-provider.component';
import { DeleteProviderComponent } from './components/delete-provider/delete-provider.component';
import { NewTravelDetailComponent } from './components/new-travel-detail/new-travel-detail.component';
import { ListTravelDetailsComponent } from './components/list-travel-details/list-travel-details.component';
import { SearchTravelDetailComponent } from './components/search-travel-detail/search-travel-detail.component';
import { UpdateTravelDetailComponent } from './components/update-travel-detail/update-travel-detail.component';
import { DeleteTravelDetailComponent } from './components/delete-travel-detail/delete-travel-detail.component';
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
    
    {path:'crear-proveedor',component:NewProviderComponent},
    {path:'listar-proveedores',component:ListProvidersComponent},
    {path:'buscar-proveedor',component:SearchProviderComponent},
    {path:'actualizar-proveedor',component:UpdateProviderComponent},
    {path:'borrar-proveedor',component:DeleteProviderComponent},

    {path:'crear-detalleViaje',component:NewTravelDetailComponent},
    {path:'listar-detalleViaje',component:ListTravelDetailsComponent},    
    {path:'buscar-detalleViaje',component:SearchTravelDetailComponent},
    {path:'actualizar-detalleViaje',component:UpdateTravelDetailComponent},
    {path:'borrar-detalleViaje',component:DeleteTravelDetailComponent},      

    {path:'**',component:ErrorComponent}
];