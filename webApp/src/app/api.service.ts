import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  getAllEnfants(): Observable<any>{
    return this.http.get(this.baseurl + '/enfants/', {headers:this.httpHeaders});
  }
  getAllHandicaps(): Observable<any>{
    return this.http.get(this.baseurl + '/handicaps/', {headers:this.httpHeaders});
  }
}
