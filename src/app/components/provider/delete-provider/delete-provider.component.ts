import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-delete-provider',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet],
  templateUrl: './delete-provider.component.html',
  styleUrl: './delete-provider.component.css'
})
export class DeleteProviderComponent {
  public deleteType: string = 'id'; // 'id' o 'name'
  public deleteValue: string = '';
  public status: number = -1;
  public token: any;

  constructor(
    private providerService: ProviderService,
    private userService: UserService
  ) {}

  onSubmit(form: any): void {
    this.token = this.userService.getToken();
    if (!this.token) {
      console.log('Error: Token no disponible')
      this.status = 2;
      return;
    }

    const confirmed = confirm(`¿Estás seguro de que deseas eliminar el proveedor por ${this.deleteType}?`);
    if (!confirmed) return;

    if (this.deleteType === 'id') {
      const id = parseInt(this.deleteValue, 10);
      if (isNaN(id)) {
        this.status = 1;
        return;
      }

      this.providerService.DeleteProviderById(id, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.status = 0
          form.reset()
        },
        error:(err:Error)=>{
          console.log(err)
          this.status = 2
        }
      });

    } else if (this.deleteType === 'name') {
      this.providerService.DeleteProviderByName(this.deleteValue, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.status = 0 
          form.reset()
        },
        error:(err:Error)=>{
          console.log(err)
          this.status = 2 
        }
      });
    }
  }
}