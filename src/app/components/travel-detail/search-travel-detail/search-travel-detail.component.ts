import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelDetail } from '../../../models/travelDetail';
import { FormsModule } from '@angular/forms';
import { TravelDetailService } from '../../../services/travelDetail.service';

@Component({
  selector: 'app-search-travel-detail',
  imports: [FormsModule,CommonModule],
  templateUrl: './search-travel-detail.component.html',
  styleUrl: './search-travel-detail.component.css'
})
export class SearchTravelDetailComponent{
  public status: any = -1; // -1: inicial, 0: éxito, 2: error
  public travels: any[] = [];
  public providers: any[] = [];
  searchId: number = 0;
  travelDetail: TravelDetail | null = null;

  constructor(
    private travelDetailService: TravelDetailService,
  ) {}

  search() {
    this.travelDetailService.getDetailsByID(this.searchId).subscribe({
      next: (data) => {
        console.log(data)
        this.travelDetail = data;
        this.status = -1;
      },
      error: (err) => {
        console.error(err);
        this.travelDetail = null;
        this.status = 'Detalle de viaje no encontrado o error en la solicitud';
      }
    });
  }

  getProviderName(idproveedor: number | null): string {
  if (idproveedor === null) return 'Sin proveedor';
    const proveedor = this.providers.find(p => p.idproveedor === idproveedor);
    return proveedor ? proveedor.nombre : 'Proveedor desconocido';
  }

  getTipoViaje(idViaje: number): string {
    const viaje = this.travels.find(v => v.idViaje === idViaje);
    return viaje ? viaje.tipoViaje : 'Viaje desconocido';
  }
}
