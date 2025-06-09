import { UserService } from './../../services/user.service';
import { ProviderService } from './../../services/provider.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../models/provider';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-proveedores',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './ad-proveedores.component.html',
  styleUrl: './ad-proveedores.component.css'
})
export class AdProveedoresComponent {
  public status: any
  public provider: any
  public providers: any
  private checkTravels: any
  public token: any
  public searchId: number = 0
  public showSingleProvider = false
  public filterType: string = 'id'; // puede ser 'id' o 'name'
  public searchValue: string = '';
  public isEditing: boolean = false;

  constructor(private providerService: ProviderService, private userService: UserService) {
    this.status = -1
    this.provider = new Provider(0, "", "")
    this.loadProviders()
    this.checkTravels = setInterval(() => {
      this.loadProviders()
    }, 2500)
  }
  changeStatus(st: number) {
    this.status = st
    let countdown = timer(4000)
    countdown.subscribe(n => {
      this.status = -1
    })
  }

  ngOnInit(): void {
    this.token = this.userService.getToken()
    this.loadProviders()
  }

  public loadProviders() {
    this.providerService.GetAllProviders(this.token).subscribe({
      next: (response: any) => {
        console.log(response)
        this.providers = response
      },
      error: (err: Error) => {
        console.log(err)
        this.providers = null
      }
    })
  }

  deleteProvider(): void {
    const confirmed = confirm(`¿Estás seguro de que deseas eliminar el proveedor por ${this.filterType}?`);
    if (!confirmed) return;

    if (!this.searchValue.trim()) {
      this.status = 'Ingrese un valor de búsqueda.';
      return;
    }

    if (this.filterType === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (isNaN(id)) {
        this.status = 1;
        return;
      }
      
      this.token=this.userService.getToken()
      this.providerService.DeleteProviderById(id, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.loadProviders()
          this.changeStatus(0)
          if (this.showSingleProvider) {
            this.clearSearch()
          }          
        },
        error:(err:Error)=>{
          console.log(err)
          this.changeStatus(2)
        }
      });

    } else if (this.filterType === 'name') {
      this.token=this.userService.getToken()
      this.providerService.DeleteProviderByName(this.searchValue, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.loadProviders()
          this.changeStatus(0)
          if (this.showSingleProvider) {
            this.clearSearch()
          }   
        },
        error:(err:Error)=>{
          console.log(err)
          this.changeStatus(2) 
        }
      });
    }
  }  

  updateProvider(): void{
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
          this.provider = response;
          this.isEditing = true;
        },
        error: (err) => {
          console.error(err);
          this.changeStatus(2)
        }
      });

    } else if (this.filterType === 'name') {
      this.token=this.userService.getToken()    
      this.providerService.GetProviderByName(this.searchValue.trim(),this.token).subscribe({
        next: (response: Provider) => {
          console.log(response)
          this.provider = response;
          this.isEditing = true;
        },
        error: (err) => {
          console.error(err);
          this.changeStatus(2)
        }
      });
    }    
  }

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
          this.showSingleProvider = true
          if (this.checkTravels) {
            clearInterval(this.checkTravels)
            this.checkTravels = null
          }
        },
        error: (err) => {
          console.error(err);
          this.providers = []
          this.showSingleProvider = false
        }
      });

    } else if (this.filterType === 'name') {
      this.token=this.userService.getToken()    
      this.providerService.GetProviderByName(this.searchValue.trim(),this.token).subscribe({
        next: (response: Provider) => {
          console.log(response)
          this.providers = [response];
          this.showSingleProvider = true
          if (this.checkTravels) {
            clearInterval(this.checkTravels)
            this.checkTravels = null
          }
        },
        error: (err) => {
          console.error(err);
          this.providers = []
          this.showSingleProvider = false
        }
      });
    }
  }

  public clearSearch() {
    this.loadProviders()
    this.showSingleProvider = false
    this.searchValue = ''
  }

  resetForm(form: any) {
    this.provider = new Provider(0, "", "");
    this.searchValue = '';
    this.isEditing = false;
    form.resetForm(); // limpia ngModel
  }

  onSubmit(form: any) {
    this.token = this.userService.getToken()
    const createData = {
      name: this.provider.nombre,
      descript: this.provider.descrip
    };      
    
    if (this.isEditing) {
      // UPDATE
      if (this.filterType === 'id') {
        const id = parseInt(this.searchValue, 10);
        if (isNaN(id)) {
          this.status = 'El ID debe ser un número.';
          return;
        }

        const updateDataId = {
          name: this.provider.nombre,
          descript: this.provider.descrip
        };

        this.providerService.UpdateProviderById(id, updateDataId, this.token).subscribe({
          next:(response:any)=>{
            console.log(response)
            this.resetForm(form);
            this.loadProviders();
            this.changeStatus(0);
            // form.reset()
          },
          error:(err:Error)=>{
            console.log(err)
            this.changeStatus(2)
          }
        });

      } else if (this.filterType === 'name') {
        const updateData = {
          new_name: this.provider.nombre || "",
          descript: this.provider.descrip || ""
        };

        this.providerService.UpdateProviderByName(this.searchValue, updateData, this.token).subscribe({
          next:(response:any)=>{
            console.log(response)
            this.resetForm(form);
            this.loadProviders();
            this.changeStatus(0);
            // form.reset()
          },
          error:(err:Error)=>{
            console.log(err)
            this.changeStatus(2)
          }
        });
      }

    } else {
      // CREATE
      this.providerService.CreateProvider(createData, this.token).subscribe({
        next: (response) => {
          console.log(response)
          if (response.generated_id) {
            // form.reset()
            this.resetForm(form);
            this.loadProviders()
            this.changeStatus(0)
          } else {
            this.changeStatus(1)
          }
        },
        error: (error: Error) => {
          console.log(error)
          this.changeStatus(2)
        }
      })
    }
  }
}
