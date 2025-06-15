import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { server } from './global';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = server.url;
  }

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
  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
   getReservationsByClient(idCliente: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}Reservations/${idCliente}`, {
      headers: this.getHeaders()
    });
  }
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.url}Reservations/delete/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateReservation(id: number, reservation: Reservation): Observable<any> {
    return this.http.put(`${this.url}/Reservations/update/${id}`, reservation, {
      headers: this.getHeaders()
    });
  }
}
