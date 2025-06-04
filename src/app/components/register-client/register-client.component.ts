
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {
  public status:number
  public client:Client

  constructor(
    private clientService:ClientService
  ){
    this.status=-1
    this.client=new Client(1, "")
  }
  changeStatus(st:number){
    this.status=st
    let countdown=timer(4000);
    countdown.subscribe(n=>{
      this.status=-1
    })
  }

  onSubmit(form:any){
    this.clientService.createClient(this.client).subscribe({
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
