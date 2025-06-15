import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { server } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phones } from '../models/phones';

@Injectable({providedIn: 'root'})
export class PhonesService {
  private url: string

  constructor(private _http: HttpClient, private UserService:UserService) {
    this.url = server.url
  }

  getPhonesByUserID(id:number): Observable<any> {
    const token = this.UserService.getToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this._http.get(`${this.url}Client/Phones/client/${id}`,{ headers })
  }
}
