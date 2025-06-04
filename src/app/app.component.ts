import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { ClientService } from './services/client.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'coco-tours';
  private checkIdentity;
  private checkRole;
  public identity:any;
  public role:any;

  constructor(
    private userService:UserService,
  ){
    this.checkIdentity=setInterval(()=>{
      this.identity=userService.getIdentity()
    },500)
    this.checkRole=setInterval(()=>{
      this.role=userService.getRole()
    },500)
  }
}