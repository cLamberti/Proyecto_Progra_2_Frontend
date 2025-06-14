import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TravelDetail } from '../../../models/travelDetail';
import { TravelDetailService } from '../../../services/travelDetail.service';
import { UserService } from '../../../services/user.service';
import { TravelService } from '../../../services/travel.service';
import { ProviderService } from '../../../services/provider.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-travel-detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-travel-detail.component.html',
  styleUrl: './new-travel-detail.component.css'
})
export class NewTravelDetailComponent implements OnInit{
  public travelDetail: TravelDetail;
  public status: number = -1;
  public token: string | null = '';
  public travels: any[] = [];
  public providers: any[] = [];

  constructor(
    private travelDetailService: TravelDetailService,
    private userService: UserService,
    private travelService: TravelService,
    private providerService: ProviderService,
    private route:Router
  ) {
    this.travelDetail = new TravelDetail(1,'', '', 0, 0, 0);
  }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    if (this.token) {
      this.travelService.getTravels(this.token).subscribe({
        next: (response:any) => {
          console.log(response)
          this.travels = response;
        },
        error: (err:Error) => {
          console.error(err);
        }
      });

      this.providerService.GetAllProviders(this.token).subscribe({
        next: (response:any) => {
          console.log(response)
          this.providers = response;
        },
        error: (err:Error) => {
          console.error(err);
        }
      });
    }
  }

  onSubmit(form: any): void {
    if (!this.token) {
      console.log('Error: Token no disponible')
      this.status = 2 // Error de autorización
      Swal.fire({
        title: 'Error',
        text: 'Error: Token no disponible',
        icon: 'error',
        confirmButtonText: 'Volver',
      }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['reservation'])
      }
    });
      return;
    }
    else{
      this.travelDetailService.CreateDetail(this.travelDetail, this.token).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.status = 0 // Éxito
        form.reset()
        Swal.fire({
          title: 'Exito',
          text: 'Exito, Reserva exitosa',
          icon: 'success',
          confirmButtonText: 'Siguiente',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showCancelButton: false,
          focusConfirm: true
        }).then((response => {
          if (response.isConfirmed){
            this.route.navigate(['/reservation-pasajeros'])
          }
        }));
      },
      error:(err:Error)=>{
        console.log(err)
        this.status = 2 // Error de servidor
        Swal.fire('Error', 'Error del servidor, volver a intentar', 'error')
      }
    });
    }
  }

  trackById(index: number, item: any): number {
  return item.idviaje;
}
}
