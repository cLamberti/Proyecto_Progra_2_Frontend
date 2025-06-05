import { Injectable } from '@angular/core';
import { server } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { User } from '../models/user'

@Injectable({ providedIn: 'root' })
export class ClientService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = server.url;
  }
  getIdentity() {
    const identity = sessionStorage.getItem('identity');
    return identity ? JSON.parse(identity) : null;
  }
   createClient(client:Client):Observable<any>{
        let params=JSON.stringify(client)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        let options={
            headers
        }
        return this._http.post(this.url+"Client",params,options)
    }
}
