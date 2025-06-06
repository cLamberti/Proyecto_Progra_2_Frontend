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
    getClientName(clientId: number): Observable<{ name: string }> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.get<{ name: string }>(`${this.url}Client/${clientId}/name`, { headers });
  }
} 