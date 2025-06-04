import { Injectable } from '@angular/core';
import {server} from "./global"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import { Observable } from "rxjs"
import { Provider } from "../models/provider"
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  public url:string
  private accessToken:string
  constructor(private _http:HttpClient) { 
    this.url=server.url
    this.accessToken=""
  }

  GetAllProviders():Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json')       
    const options={
      headers
    }
    return this._http.get(this.url+'provider/all',options)
  }

  CreateProvider(provider:Provider,token:any):Observable<any>{
    this.accessToken="bearer "+token
    let headers=new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.accessToken)
    let options={
      headers
    }
    let data=JSON.stringify(provider)
    return this._http.post(this.url+'provider',data,options)
  }

  GetProviderById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const options = { headers }
    return this._http.get(this.url + 'provider/' + id, options)
  }

  GetProviderByName(name: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const options = { headers }
    return this._http.get(this.url + 'provider/name/' + name, options)
  }

  UpdateProviderById(id: number, provider: Provider, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    const data = JSON.stringify(provider)
    return this._http.patch(this.url + 'provider/update/' + id, data, options)
  }

  UpdateProviderByName(name: string, provider: { new_name: string; descrip: string }, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    const data = JSON.stringify(provider)
    return this._http.patch(this.url + 'provider/update/name/' + name, data, options)
  }

  DeleteProviderById(id: number, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    return this._http.delete(this.url + 'provider/delete/' + id, options)
  }

  DeleteProviderByName(name: string, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    return this._http.delete(this.url + 'provider/delete/name/' + name, options)
  }
}
