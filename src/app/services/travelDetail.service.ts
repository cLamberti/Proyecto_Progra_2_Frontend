import { Injectable } from '@angular/core';
import {server} from "./global"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import { Observable } from "rxjs"
import { TravelDetail } from "../models/travelDetail"
@Injectable({
  providedIn: 'root'
})
export class TravelDetailService {
  public url:string
  private accessToken:string
  constructor(private _http:HttpClient) { 
    this.url=server.url
    this.accessToken=""
  }

  getAllDetails(token:any):Observable<any>{
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }
    return this._http.get(this.url+'Details/all',options)
  }

  CreateDetail(travelDetail:TravelDetail,token:any):Observable<any>{
    this.accessToken="bearer "+token
    let headers=new HttpHeaders().set('Content-Type','application/json').set('Authorization',this.accessToken)
    let options={
      headers
    }
    let data=JSON.stringify(travelDetail)
    return this._http.post(this.url+'Details',data,options)
  }

  getDetailsByID(id: number,token:any): Observable<any> {
    this.accessToken="bearer "+token    
    const headers=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization',this.accessToken)    
    const options={
      headers
    }
    return this._http.get(this.url + 'Details/' + id, options)
  }

  UpdateDetail(id: number, travelDetail: TravelDetail, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    const data = JSON.stringify(travelDetail)
    return this._http.patch(this.url + 'Details/update/' + id, data, options)
  }

  DeleteDetail(id: number, token: any): Observable<any> {
    this.accessToken = "bearer " + token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.accessToken)
    const options = { headers }
    return this._http.delete(this.url + 'Details/delete/' + id, options)
  }
}
