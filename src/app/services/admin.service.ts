import { Injectable } from '@angular/core';
import { server } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = server.url;
  }
   createAdmin(admin: Admin): Observable<any> {
        let params = JSON.stringify(admin);
        let token = sessionStorage.getItem('token');
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        return this._http.post(this.url + "Admin", params, { headers });
    }
    getToken() {
    return sessionStorage.getItem('token');
  }
  getAdmin(): Observable<Admin[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this._http.get<Admin[]>(`${this.url}Admin/all`, { headers });
  }
  getAdminById(id: number): Observable<any> {
    return this._http.get(`${this.url}Admin/${id}`);
  }
}
