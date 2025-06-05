
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { StatusService } from '../../services/status.service';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register-client',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.css'
})
export class RegisterClientComponent {
  public client:Client

  constructor(
    private clientService:ClientService,
    public statusService:StatusService
  ){
    this.statusService.status=-1
    this.client=new Client(0, "")
  }
  changeStatus(st:number){
    this.statusService.status=st
    let countdown=timer(60000);
    countdown.subscribe(n=>{
      this.statusService.status=-1
    })
  }

  onSubmit(form:any){
    this.clientService.createClient(this.client).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.generated_id){
          this.changeStatus(0)
          this.client.idClient = response.generated_id
          sessionStorage.setItem('identityClient', JSON.stringify(this.client.idClient));
        }else{
          form.reset()
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
