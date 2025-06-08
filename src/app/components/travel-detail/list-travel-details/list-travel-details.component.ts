import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelDetailService } from '../../../services/travelDetail.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-list-travel-details',
  imports: [FormsModule,CommonModule],
  templateUrl: './list-travel-details.component.html',
  styleUrl: './list-travel-details.component.css'
})
export class ListTravelDetailsComponent implements OnInit {
  public travelDetails: any[] = [];
  public status: number = -1; // -1: inicial, 0: éxito, 2: error
  public token: any
  public travels: any[] = [];
  public providers: any[] = [];

  constructor(
    private travelDetailService: TravelDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.userService.getToken();
    if (this.token) {
      this.travelDetailService.getAllDetails(this.token).subscribe({
        next: (response) => {
          console.log(response)
          this.travelDetails = response;
          this.status = 0;
        },
        error: (err) => {
          console.error(err);
          this.status = 2;
        }
      });
    }
  }

  getProviderName(idproveedor: number | null): string {
    if (idproveedor === null) return 'Sin proveedor';
    const proveedor = this.providers.find(p => p.idproveedor === idproveedor);
    return proveedor ? proveedor.nombre : 'Proveedor desconocido';
  }

  getTipoViaje(id: number): string {
    const viaje = this.travels.find(v => v.id === id);
    return viaje ? viaje.tipoviaje : 'Viaje desconocido';
  }

}
