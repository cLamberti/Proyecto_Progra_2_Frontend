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

  GetAllProviders(token:any):Observable<any>{
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }
    return this._http.get(this.url+'Provider/all',options)
  }

  CreateProvider(provider: { name: string; descript: string },token:any):Observable<any>{
    this.accessToken="bearer "+token
    let headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)
    let options={
      headers
    }
    let data=JSON.stringify(provider)
    return this._http.post(this.url+'Provider',data,options)
  }

  GetProviderById(id: number,token:any): Observable<any> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }
    return this._http.get(this.url + 'Provider/' + id, options)
  }

  GetProviderByName(name: string,token:any): Observable<any> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }
    return this._http.get(this.url + 'Provider/name/' + name, options)
  }

  UpdateProviderById(id: number, provider: { name: string; descript: string }, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    const data = JSON.stringify(provider)
    return this._http.patch(this.url + 'Provider/update/' + id, data, options)
  }

  UpdateProviderByName(name: string, provider: { new_name: string; descript: string }, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    // const data = JSON.stringify(provider)
    return this._http.patch(this.url + 'Provider/update/name/' + name, provider, options)
  }

  DeleteProviderById(id: number, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    return this._http.delete(this.url + 'Provider/delete/' + id, options)
  }

  DeleteProviderByName(name: string, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    return this._http.delete(this.url + 'Provider/delete/name/' + name, options)
  }
}
