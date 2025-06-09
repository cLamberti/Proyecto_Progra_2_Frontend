import { Injectable } from '@angular/core';
import { server } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = server.url;
  }
   createClient(client:Client):Observable<any>{
        let params=JSON.stringify(client)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        let options={
            headers
        }
        return this._http.post(this.url+"Client",params,options)
    }
    getClient(): Observable<Client[]> {
        const token = this.getToken();
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        });
        return this._http.get<Client[]>(`${this.url}Client/all`, { headers });
      }
      getToken() {
    return sessionStorage.getItem('token');
  }
} 