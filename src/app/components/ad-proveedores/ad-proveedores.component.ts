import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../models/provider';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ProviderService } from './../../services/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-proveedores',
  imports: [FormsModule, CommonModule],
  templateUrl: './ad-proveedores.component.html',
  styleUrl: './ad-proveedores.component.css'
})
export class AdProveedoresComponent {
  public status: any;
  public provider: Provider;
  public providers: any;
  private checkTravels: any;
  public token: any;
  public searchId: number = 0;
  public showSingleProvider = false;
  public filterType: string = 'id';
  public searchValue: string = '';
  public isEditing: boolean = false;

  constructor(private providerService: ProviderService, private userService: UserService) {
    this.status = -1;
    this.provider = new Provider(0, "", "");
    this.loadProviders();
    this.checkTravels = setInterval(() => {
      this.loadProviders();
    }, 2500);
  }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    this.loadProviders();
  }

  public loadProviders() {
    this.providerService.GetAllProviders(this.token).subscribe({
      next: (response: any) => {
        this.providers = response;
      },
      error: (err: Error) => {
        console.error(err);
        this.providers = null;
      }
    });
  }

  async deleteProvider(): Promise<void> {
    if (!this.searchValue.trim()) {
      Swal.fire('Error', 'Ingrese un valor de búsqueda.', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el proveedor por ${this.filterType}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    const token = this.userService.getToken();

    if (this.filterType === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (isNaN(id)) {
        Swal.fire('Error', 'El ID debe ser un número.', 'error');
        return;
      }

      this.providerService.DeleteProviderById(id, token).subscribe({
        next: () => {
          this.loadProviders();
          this.clearSearch();
          Swal.fire('Eliminado', 'Proveedor eliminado correctamente.', 'success');
        },
        error: (err: Error) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error');
        }
      });

    } else {
      this.providerService.DeleteProviderByName(this.searchValue, token).subscribe({
        next: () => {
          this.loadProviders();
          this.clearSearch();
          Swal.fire('Eliminado', 'Proveedor eliminado correctamente.', 'success');
        },
        error: (err: Error) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo eliminar el proveedor.', 'error');
        }
      });
    }
  }

  updateProvider(): void {
    if (!this.searchValue.trim()) {
      Swal.fire('Error', 'Ingrese un valor de búsqueda.', 'warning');
      return;
    }

    const token = this.userService.getToken();

    if (this.filterType === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (isNaN(id)) {
        Swal.fire('Error', 'El ID debe ser un número.', 'error');
        return;
      }

      this.providerService.GetProviderById(id, token).subscribe({
        next: (response: Provider) => {
          this.provider = response;
          this.isEditing = true;
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se encontró el proveedor.', 'error');
        }
      });

    } else {
      this.providerService.GetProviderByName(this.searchValue.trim(), token).subscribe({
        next: (response: Provider) => {
          this.provider = response;
          this.isEditing = true;
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se encontró el proveedor.', 'error');
        }
      });
    }
  }

  search(): void {
    if (!this.searchValue.trim()) {
      Swal.fire('Error', 'Ingrese un valor de búsqueda.', 'warning');
      return;
    }

    const token = this.userService.getToken();

    const handleResponse = (response: Provider) => {
      this.providers = [response];
      this.showSingleProvider = true;
      if (this.checkTravels) {
        clearInterval(this.checkTravels);
        this.checkTravels = null;
      }
    };

    const handleError = () => {
      this.providers = [];
      this.showSingleProvider = false;
      Swal.fire('Error', 'Proveedor no encontrado.', 'error');
    };

    if (this.filterType === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (isNaN(id)) {
        Swal.fire('Error', 'El ID debe ser un número.', 'error');
        return;
      }

      this.providerService.GetProviderById(id, token).subscribe({ next: handleResponse, error: handleError });
    } else {
      this.providerService.GetProviderByName(this.searchValue.trim(), token).subscribe({ next: handleResponse, error: handleError });
    }
  }

  clearSearch() {
    this.loadProviders();
    this.showSingleProvider = false;
    this.searchValue = '';
    this.isEditing = false;
  }

  resetForm(form: any) {
    this.provider = new Provider(0, "", "");
    this.searchValue = '';
    this.isEditing = false;
    form.resetForm();
  }

  onSubmit(form: any) {
    const token = this.userService.getToken();

    const createData = {
      name: this.provider.nombre,
      descript: this.provider.descrip
    };

    if (this.isEditing) {
      if (this.filterType === 'id') {
        const id = parseInt(this.searchValue, 10);
        if (isNaN(id)) {
          Swal.fire('Error', 'El ID debe ser un número.', 'error');
          return;
        }

        this.providerService.UpdateProviderById(id, createData, token).subscribe({
          next: () => {
            this.resetForm(form);
            this.loadProviders();
            Swal.fire({
              icon: 'success',
              title: 'Proveedor actualizado',
              text: `El proveedor con ID ${id} fue actualizado correctamente.`,
              confirmButtonText: 'Aceptar'
            });
          },
          error: (err: Error) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo actualizar el proveedor.', 'error');
          }
        });

      } else {
        const updateData = {
          new_name: this.provider.nombre,
          descript: this.provider.descrip
        };

        this.providerService.UpdateProviderByName(this.searchValue, updateData, token).subscribe({
          next: () => {
            this.resetForm(form);
            this.loadProviders();
            Swal.fire({
              icon: 'success',
              title: 'Proveedor actualizado',
              text: `El proveedor "${this.searchValue}" fue actualizado correctamente.`,
              confirmButtonText: 'Aceptar'
            });
          },
          error: (err: Error) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo actualizar el proveedor.', 'error');
          }
        });
      }

    } else {
      this.providerService.CreateProvider(createData, token).subscribe({
        next: (response) => {
          this.resetForm(form);
          this.loadProviders();

          Swal.fire({
            icon: 'success',
            title: 'Proveedor creado',
            text: response.generated_id
              ? `Proveedor "${createData.name}" creado con ID ${response.generated_id}.`
              : `Proveedor "${createData.name}" creado correctamente.`,
            confirmButtonText: 'Aceptar'
          });
        },
        error: (err: Error) => {
          console.error(err);
          Swal.fire('Error', 'Ocurrió un error al crear el proveedor.', 'error');
        }
      });
    }
  }
}