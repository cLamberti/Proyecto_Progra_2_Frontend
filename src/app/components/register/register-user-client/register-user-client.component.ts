
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { timer } from 'rxjs';
import { RouterLink } from '@angular/router';
import { StatusService } from '../../../services/status.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register-user-client',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-user-client.component.html',
  styleUrl: './register-user-client.component.css'
})
export class RegisterUserClientComponent {
  public user: User

  constructor(
    private userService: UserService,
    public statusService: StatusService,
    private router: Router
  ) {
    this.statusService.status = -1
    this.user = new User(0, "", "", "")
  }
  changeStatus(st: number) {
    this.statusService.status = st
    let countdown = timer(60000);
    countdown.subscribe(n => {
      this.statusService.status = -1
    })
  }
  onSubmit(form: any) {
    this.user.idCliente = this.userService.getIdentityClient();
    this.userService.createUser(this.user).subscribe({
      next: (response) => {
        console.log(response)
        if (response.generated_id) {
          Swal.fire({
            title: 'Exito',
            text: 'Registro de usuario exitoso ya puede iniciar sesión',
            icon: 'success',
            confirmButtonText: 'Iniciar sesión'
          }).then((result: any) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
          this.changeStatus(0)
          this.user.idUsuario = response.generated_id
        } else {
          form.reset
          this.changeStatus(1)
          Swal.fire('Error', 'No se pudo registrar el usuario.', 'error');
        }
      },
      error: (error: Error) => {
        console.log(error)
        this.changeStatus(2)
      }
    })
  }
}
