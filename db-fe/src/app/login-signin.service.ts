import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {url} from './config';

@Injectable({
  providedIn: 'root'
})
export class LoginSigninService {

  constructor(
    private http: HttpClient
  ) {}

  sendPostRequest(data: any, path: string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post<any>(url + path, data, { 
      headers: httpHeaders
     });
  }
  
}
