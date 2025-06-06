import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Provider } from '../../models/provider';
import { UserService } from '../../services/user.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-new-provider',
  imports: [FormsModule],
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
    this.providerService.CreateProvider(this.provider,this.token).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.status = 0
      },
      error:(err:Error)=>{
        console.log(err)
        this.status = 2
      }
    })
  
  }
}
