import { Component } from '@angular/core';
import { Provider } from '../../models/provider';
import { ProviderService } from '../../services/provider.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-provider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-provider.component.html',
  styleUrl: './search-provider.component.css'
})
export class SearchProviderComponent {
  public filterType: string = 'id'; // puede ser 'id' o 'name'
  public searchValue: string = '';
  public status: any = -1;
  public providers: Provider[] = [];

  constructor(private providerService: ProviderService) {}

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

      this.providerService.GetProviderById(id).subscribe({
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
      this.providerService.GetProviderByName(this.searchValue.trim()).subscribe({
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
