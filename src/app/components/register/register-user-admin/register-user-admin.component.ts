
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusService } from '../../../services/status.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-user-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-user-admin.component.html',
  styleUrl: './register-user-admin.component.css'
})
export class RegisterUserAdminComponent {
  public user:User

  constructor(
    private userService:UserService,
    public statusService:StatusService,
    private router:Router
  ){
    this.statusService.status=-1
    this.user=new User(0, "", "", "")
  }
  changeStatus(st:number){
    this.statusService.status=st
    let countdown=timer(60000);
    countdown.subscribe(n=>{
      this.statusService.status=-1
    })
  }
  onSubmit(form:any){
      this.user.idAdministrador = this.userService.getIdentityAdmin();
      this.userService.createUser(this.user).subscribe({
        next:(response)=>{
          console.log(response)
          if(response.generated_id){
            Swal.fire({
              title:'Exito',
              text:'Registro de usuario admin exitoso ya puede iniciar sesión',
              icon:'success',
              confirmButtonText:'Iniciar sesión',
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showCancelButton:false,
              focusConfirm: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']);
              }
            });
            this.changeStatus(0)
            this.user.idUsuario = response.generated_id
          }else{
            form.reset
            this.changeStatus(1)
            Swal.fire('Error', 'No se pudo registrar el usuario admin.', 'error');
          }
        },
        error:(error:Error)=>{
          console.log(error)
          this.changeStatus(2)
        }
      })
    }
}
