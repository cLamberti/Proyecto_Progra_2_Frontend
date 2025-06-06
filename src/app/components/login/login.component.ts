import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [FormsModule, SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  public status: number;
  public user: User;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {
    this.status = -1;
    this.user = new User(0, '', '', '', 0, 0);
  }

  onSubmit(form: any) {
    this._userService.login(this.user).subscribe({
      next: (response: any) => {
        if (response.access_token) {
          Swal.fire({
            title: 'Exito',
            text: 'Inicio de sesion exitoso',
            icon: 'success',
            confirmButtonText:'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
            sessionStorage.setItem('token', response.access_token);
            sessionStorage.setItem('identity', JSON.stringify(response.logged_user));
            sessionStorage.setItem('role', response.role);
            this._router.navigate(['']);
            }
            });;
        } else {
          this.status = 0;
        }
      },
      error: (err) => {
        console.log(err);
        this.status = 1;
        Swal.fire('Error', 'Inicio de sesion fallo, Usuario y/o contraseña incorrecta', 'error');
      }
    });
  }
}
