
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register-user-client.component.html',
  styleUrl: './register-user-client.component.css'
})
export class RegisterUserClientComponent {
  public user:User

  constructor(
    private userService:UserService,
    public statusService:StatusService
  ){
    this.statusService.status=-1
    this.user=new User(0, "", "", "")
  }
  changeStatus(st:number){
    this.statusService.status=st
    let countdown=timer(6000);
    countdown.subscribe(n=>{
      this.statusService.status=-1
    })
  }
  onSubmit(form:any){
    this.user.idCliente = this.userService.getIdentityClient();
    this.userService.createUser(this.user).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.generated_id){
          this.changeStatus(0)
          this.user.idUsuario = response.generated_id
        }else{
          form.reset
          this.changeStatus(1)
        }
      },
      error:(error:Error)=>{
        console.log(error)
        this.changeStatus(2)
      }
    })
  }
}
