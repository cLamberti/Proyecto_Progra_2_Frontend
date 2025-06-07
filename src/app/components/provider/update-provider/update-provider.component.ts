import { Component } from '@angular/core';
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../services/provider.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-update-provider',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet],
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
      
      const updateDataId = {
        name: this.provider.nombre,
        descript: this.provider.descrip
      };

      this.providerService.UpdateProviderById(id, updateDataId, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          this.status = 0 // Éxito
          form.reset()
        },
        error:(err:Error)=>{
          console.log(err)
          this.status = 2 // Error de servidor
        }
      });
    } else if (this.searchType === 'name') {

      const updateData = {
        new_name: this.provider.nombre || "",
        descript: this.provider.descrip || ""
      };

      this.providerService.UpdateProviderByName(this.searchValue, updateData, this.token).subscribe({
        next:(response:any)=>{
          console.log(response)
          // console.log('Datos que se envían:', this.provider)
          this.status = 0
          // Solo reiniciar los campos manualmente
          // this.provider = new Provider(0, "", "");
          // this.searchValue = '';
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
