import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getMethod<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.httpHeaders });
  }

  postMethod<T>(url: string, payload: any): Observable<T> {
    return this.http.post<T>(url, payload, { headers: this.httpHeaders });
  }


}
