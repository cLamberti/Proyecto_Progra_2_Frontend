import { Injectable } from "@angular/core";
import { server } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Travel } from "../models/travel";

@Injectable({ providedIn: 'root' })
export class TravelService {
  private url: string
  private token: string

  constructor(private _http: HttpClient) {
    this.url = server.url
    this.token = ""
  }

  getTravels(token: any) {
    this.token = "Bearer " + token
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
    const options = {
      headers
    }
    return this._http.get(this.url + 'Travel/all', options)
  }

  getTravelById(id: number, token: any) {
    this.token = "Bearer " + token
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
    const options = {
      headers
    }
    return this._http.get(this.url + `Travel/${id}`, options)
  }

  createTravel(travel: Travel, token: any): Observable<any> {
    this.token = "Bearer " + token
    let params = JSON.stringify(travel)
    console.log("Objeto enviado al backend: " + JSON.stringify(travel, null, 2))
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
    let options = {
      headers
    }
    return this._http.post(this.url + "Travel", params, options)
  }

  deleteTravel(id: number, token: any): Observable<any> {
    this.token = "Bearer " + token
    const headers = new HttpHeaders().set('Authorization', this.token)
    let options = {
      headers
    }
    return this._http.delete(this.url + `Travel/delete/${id}`, options)
  }
}
