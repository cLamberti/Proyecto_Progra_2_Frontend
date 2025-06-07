import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';  
import { ClientService } from './services/client.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,SweetAlert2Module],
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
    private router:Router
  ){
    this.checkIdentity=setInterval(()=>{
      this.identity=userService.getIdentity()
    },500)
    this.checkRole=setInterval(()=>{
      this.role=userService.getRole()
    },500)
  }

logOutConfirmado() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Tu sesión se cerrará',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.logOut();
      Swal.fire({
        text: 'Sesion cerrada correctamente',
        icon: 'success',
        confirmButtonText:'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['']);
        }
      });
    }
  });
}
}