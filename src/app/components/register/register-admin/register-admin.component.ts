
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../services/admin.service';
import { StatusService } from '../../../services/status.service';
import { timer } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
  public admin:Admin

  constructor(
    private adminService:AdminService,
    public statusService:StatusService,
    private router:Router
  ){
    this.statusService.status=-1
    this.admin=new Admin(0, "")
  }
  changeStatus(st:number){
    this.statusService.status=st
    let countdown=timer(60000);
    countdown.subscribe(n=>{
      this.statusService.status=-1
    })
  }

  onSubmit(form:any){
    this.adminService.createAdmin(this.admin).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.generated_id){
          this.changeStatus(0)
          this.admin.idAdmin = response.generated_id
          sessionStorage.setItem('identityAdmin', JSON.stringify(this.admin.idAdmin));
          Swal.fire({
                      title: 'exito',
                      text: 'Registro de nombre correcto, ya puede seguir con el registro',
                      icon:'success',
                      confirmButtonText:'Continuar?'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.router.navigate(['/register-user-admin']);
                      }
                    });
                  }else{
                    form.reset()
                    this.changeStatus(1)
                    Swal.fire('Error', 'No se pudo registrar el nombre.', 'error');
                  }
      },
      error:(error:Error)=>{
        console.log(error)
        this.changeStatus(2)
      }
    })
  }
}