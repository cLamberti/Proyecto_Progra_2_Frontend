import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { server } from './global';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public url:string
  private accessToken:string
  constructor(private _http:HttpClient) { 
    this.url=server.url
    this.accessToken=""
  }

  getReservations(token:any):Observable<any>{
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }
    return this._http.get(this.url+'Reservations/all',options)
  }

  createReservation(reservation: Reservation, token: any): Observable<any> {
    this.accessToken="bearer "+token
    let headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)
    let options={
      headers
    }
    let body = JSON.stringify({      
      idUsuario: reservation.idUsuario,
      idDetail: reservation.idDetail, 
      estado: reservation.estado,
    });
    return this._http.post(this.url+'Reservations',body,options)   
    // this.accessToken="bearer "+token    
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('Authorization', token);
    // let body = JSON.stringify({      
    //   idUsuario: reservation.idUsuario,
    //   idDetail: reservation.idDetail, 
    //   estado: reservation.estado,
    // });    

    // return this._http.get(this.url+'Reservations',body, options)
  }
  // private getHeaders(): HttpHeaders {
  //   const token = sessionStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: token ? `Bearer ${token}` : ''
  //   });
  // }
   getReservationsByClient(idCliente: number, token:any): Observable<Reservation[]> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }    
    return this._http.get<Reservation[]>(`${this.url}Reservations/${idCliente}`, options);
  }

   getReservationsById(id: number, token:any): Observable<any> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }    
    return this._http.get<Reservation[]>(`${this.url}Reservations/${id}`, options);
  }  

  deleteReservation(id: number, token:any): Observable<any> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }    
    return this._http.delete(`${this.url}Reservations/delete/${id}`, options);
  }

  updateReservation(id: number, reservation: Reservation, token:any): Observable<any> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }    
    return this._http.put(`${this.url}/Reservations/update/${id}`, reservation, options);
  }
}
