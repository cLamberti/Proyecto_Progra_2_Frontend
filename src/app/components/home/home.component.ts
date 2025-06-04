import { Component } from '@angular/core';
import { User } from '../../models/user';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private checkIdentity;
  public identity:any;

  constructor(
      private userService:UserService,
    ){
      this.checkIdentity=setInterval(()=>{
        this.identity=userService.getIdentity()
      },500)
    }
}