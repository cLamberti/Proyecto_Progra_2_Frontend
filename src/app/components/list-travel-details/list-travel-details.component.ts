import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelDetailService } from '../../services/travelDetail.service';
import { UserService } from '../../services/user.service';


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
      this.travelDetailService.getAllDetails().subscribe({
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

  getProviderName(idProveedor: number | null): string {
    if (idProveedor === null) return 'Sin proveedor';
    const proveedor = this.providers.find(p => p.idProveedor === idProveedor);
    return proveedor ? proveedor.nombre : 'Proveedor desconocido';
  }

  getTipoViaje(idViaje: number): string {
    const viaje = this.travels.find(v => v.idViaje === idViaje);
    return viaje ? viaje.tipoViaje : 'Viaje desconocido';
  }

}
