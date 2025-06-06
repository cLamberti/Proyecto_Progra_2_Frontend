import { Component } from '@angular/core';
import { Provider } from '../../models/provider';
import { ProviderService } from '../../services/provider.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-provider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-provider.component.html',
  styleUrl: './update-provider.component.css'
})
export class UpdateProviderComponent {
  public status:number
  public provider:Provider
  public searchType: string = 'id'; // 'id' o 'name'
  public searchValue: string = '';
  private token:any 

  constructor(
    private userService:UserService,
    private providerService:ProviderService
  ){
    this.status=-1
    this.provider=new Provider(0,"", "")
  }

  onSubmit(form: any): void {
    this.token=this.userService.getToken()
    if (!this.token) {
      console.log('Error: Token no disponible')
      this.status = 2 // Error de autorización
      return
    }

    if (this.searchType === 'id') {
      const id = parseInt(this.searchValue, 10)
      if (isNaN(id)) {
        this.status = 1
        return
      }

      this.providerService.UpdateProviderById(id, this.provider, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.status = 0 // Éxito
        },
        error:(err:Error)=>{
          console.log(err)
          this.status = 2 // Error de servidor
        }
      });
    } else if (this.searchType === 'name') {
      const updateData = {
        new_name: this.provider.nombre,
        descrip: this.provider.descrip
      };

      this.providerService.UpdateProviderByName(this.searchValue, updateData, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.status = 0 // Éxito
        },
        error:(err:Error)=>{
          console.log(err)
          this.status = 2 // Error de servidor  
        }
      });
    }
  }
}
