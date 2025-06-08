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
    getUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this._http.get<User[]>(`${this.url}User/all`, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this._http.delete(`${this.url}User/delete/${id}`, { headers });
  }
    setIdentity(response:any){
      sessionStorage.setItem('identity', JSON.stringify(response.logged_user));
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
    setToken(response: any){
      sessionStorage.setItem('token', response.access_token);
    }
    getToken() {
      return sessionStorage.getItem('token');
    }
    setRole(response:any){
      sessionStorage.setItem('role', response.role);
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
  updateUser(id: number, userData: any): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const requestBody = {
    idusuario: id,
    usuario: userData.user,
    correo: userData.email
  };

  return this._http.patch(
    `${this.url}User/update/${id}`,
    requestBody,
    { headers }
  );
}

  updatePassword(id: number, password: string): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  const body = {
    id: id,
    password: password
  };
  return this._http.patch(
    `${this.url}User/password/${id}`,
    body,
    { headers }
  );
}

  }
