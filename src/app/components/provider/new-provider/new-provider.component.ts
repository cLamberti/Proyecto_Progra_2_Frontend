import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../../models/provider';
import { UserService } from '../../../services/user.service';
import { ProviderService } from '../../../services/provider.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-new-provider',
  imports: [FormsModule,RouterLink,RouterOutlet],
  templateUrl: './new-provider.component.html',
  styleUrl: './new-provider.component.css'
})
export class NewProviderComponent {
  public status:number
  public provider:Provider
  private token:any 

  constructor(
    private userService:UserService,
    private providerService:ProviderService
  ){
    this.status=-1
    this.provider=new Provider(1,"", "")
  }
  onSubmit(form:any){
    this.token=this.userService.getToken()
    const createData = {
      name: this.provider.nombre,
      descript: this.provider.descrip
    };    
    this.providerService.CreateProvider(createData,this.token).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.status = 0
        form.reset()
      },
      error:(err:Error)=>{
        console.log(err)
        this.status = 2
      }
    })
  
  }
}
