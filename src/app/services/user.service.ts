import { Injectable } from '@angular/core';
import { server } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = server.url;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}login`, user, { headers });
  }

  getIdentity() {
    const identity = sessionStorage.getItem('identity');
    return identity ? JSON.parse(identity) : null;
  }
  getIdentityClient() {
    const identityClient = sessionStorage.getItem('identityClient');
    return identityClient ? JSON.parse(identityClient) : null;
  }
  getIdentityAdmin() {
    const identityAdmin = sessionStorage.getItem('identityAdmin');
    return identityAdmin ? JSON.parse(identityAdmin) : null;
  }
  getToken() {
    return sessionStorage.getItem('token');
  }
  getRole() {
    return sessionStorage.getItem('role');
  }
  logOut(){
    const identity = sessionStorage.clear()
  }
   createUser(user:User):Observable<any>{
        let params=JSON.stringify(user)
        let headers=new HttpHeaders().set('Content-Type','application/json')
        let options={
            headers
        }
        return this._http.post(this.url+"User",params,options)
    }
}
