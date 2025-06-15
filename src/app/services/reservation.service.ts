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
  createReservation(token: string, reservation: Reservation): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    const body = JSON.stringify({
      idclient: reservation.idCliente,
      idadministrator: reservation.idAdministrador,
      idDetail: reservation.idDetail
    });

    return this.http.post(`${this.url}reservation`, body, { headers });
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
  updateReservation(id: number, reservation: Reservation): Observable<any> {
    return this.http.put(`${this.url}/Reservations/update/${id}`, reservation, {
      headers: this.getHeaders()
    });
  }
}
