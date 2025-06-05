import { Injectable } from "@angular/core";
import { server } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Travel } from "../models/travel";

@Injectable({ providedIn: 'root' })
export class TravelService {
  private url: string

  constructor(private _http: HttpClient) {
    this.url = server.url
  }

  createTravel(travel: Travel): Observable<any> {
    let params = JSON.stringify(travel)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    let options = {
      headers
    }
    return this._http.post(this.url + "Travel", params, options)
  }
}
