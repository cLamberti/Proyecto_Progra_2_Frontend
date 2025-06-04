
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  public status:number
  public user:User

  constructor(
    private userService:UserService
  ){
    this.status=-1
    this.user=new User(0, "", "")
  }
  changeStatus(st:number){
    this.status=st
    let countdown=timer(4000);
    countdown.subscribe(n=>{
      this.status=-1
    })
  }

  onSubmit(form:any){
    this.userService.createUser(this.user).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.generated_id){
          form.reset()
          this.changeStatus(0)
        }else{
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
