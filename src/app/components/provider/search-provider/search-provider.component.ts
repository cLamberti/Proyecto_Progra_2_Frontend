import { Component } from '@angular/core';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search-provider',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet],
  templateUrl: './search-provider.component.html',
  styleUrl: './search-provider.component.css'
})
export class SearchProviderComponent {
  public filterType: string = 'id'; // puede ser 'id' o 'name'
  public searchValue: string = '';
  public status: any = -1;
  public providers: Provider[] = [];
  private token:any 

  constructor(
    private providerService: ProviderService,
    private userService:UserService 
  ) {}

    search(): void {
    this.providers = [];
    this.status = -1;

    if (!this.searchValue.trim()) {
      this.status = 'Ingrese un valor de búsqueda.';
      return;
    }

    if (this.filterType === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (isNaN(id)) {
        this.status = 'El ID debe ser un número.';
        return;
      }

      this.token=this.userService.getToken()    
      this.providerService.GetProviderById(id, this.token).subscribe({
        next: (response: Provider) => {
          console.log(response)
          this.providers = [response];
        },
        error: (err) => {
          console.error(err);
          this.status = 'Proveedor no encontrado por ID.';
        }
      });

    } else if (this.filterType === 'name') {
      this.token=this.userService.getToken()    
      this.providerService.GetProviderByName(this.searchValue.trim(),this.token).subscribe({
        next: (response: Provider) => {
          console.log(response)
          this.providers = [response];
        },
        error: (err) => {
          console.error(err);
          this.status = 'Proveedor no encontrado por nombre.';
        }
      });
    }
  }

}
