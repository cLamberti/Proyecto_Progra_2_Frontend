import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [FormsModule, CommonModule]
})
export class UserProfileComponent implements OnInit {
  identity: any;
  passwordData: any = {
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService,
    private route:Router
  ) {}

 ngOnInit() {
  this.identity = this.userService.getIdentity();
  if (!this.identity) {
    this.route.navigate(['/login']);
    return;
  }
}
  updateUser() {
  if (!this.identity || !this.identity.id) {
    Swal.fire('Error', 'Usuario no identificado', 'error');
    return;
  }

  this.userService.updateUser(this.identity.id, {
    user: this.identity.user,
    email: this.identity.email
  }).subscribe({
    next: (response: any) => {
      Swal.fire({
        title: 'Exito',
        text: 'Datos actualizados correctamente, Inicie sesión con sus datos nuevos',
        icon: 'success',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCancelButton: false,
        focusConfirm: true
      }).then((result) => {
    if (result.isConfirmed) {
      this.userService.logOut()
      this.route.navigate(['/login'])
    }
    })
      
      if (response.updatedUser) {
        this.userService.setIdentity(response.updatedUser);
        this.identity = this.userService.getIdentity();
      }
    },
    error: (error) => {
      console.error('Error completo:', error);
      let errorMsg = 'Error al actualizar los datos';
      
      if (error.error?.message) {
        errorMsg = error.error.message;
      } else if (error.status === 404) {
        errorMsg = 'Endpoint no encontrado (404)';
      }
      
      Swal.fire('Error', errorMsg, 'error');
    }
  });
}

updatePassword() {
  if (!this.identity || !this.identity.id) {
    Swal.fire('Error', 'Usuario no identificado', 'error');
    return;
  }

  if (this.passwordData.password !== this.passwordData.confirmPassword) {
    Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    return;
  }
  
  this.userService.updatePassword(this.identity.id, this.passwordData.password)
    .subscribe({
      next: (response: any) => {
        Swal.fire('Éxito', response.message || 'Contraseña actualizada correctamente', 'success');
        this.passwordData = { password: '', confirmPassword: '' };
      },
      error: (error) => {
        console.error('Error al cambiar contraseña:', error);
        let errorMsg = 'Error al cambiar contraseña';
        
        if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        Swal.fire('Error', errorMsg, 'error');
      }
    });
}
  deleteAccount() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar cuenta',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.identity.id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminada!',
              'Tu cuenta ha sido eliminada.',
              'success'
            ).then(() => {
              this.userService.logOut()
              this.route.navigate(['/'])
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: error.error.message || 'Error al eliminar la cuenta',
              icon: 'error'
            });
          }
        });
      }
    });
  }
}