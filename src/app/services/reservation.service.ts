// src/app/services/reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { server } from './global';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = server.url;
  }
  getAllReservas(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}Reservations/all`);
  }

  getReservaById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.url}Reservations/${id}`);
  }

  createReserva(reserva: { idUsuario: number; idDetail: number; estado: string }): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.url}Reservations`, reserva);
  }

  updateReserva(id: number, data: { idusuario: number; idDetail: number }): Observable<any> {
    return this.http.put(`${this.url}Reservations/update/${id}`, data);
  }

  updateEstado(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.url}Reservations/status/${id}`, { estado });
  }

  deleteReserva(id: number): Observable<any> {
    return this.http.delete(`${this.url}Reservations/delete/${id}`);
  }
}
