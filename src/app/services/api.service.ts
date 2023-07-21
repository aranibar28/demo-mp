import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const base_url = 'https://server-mercado-pago.vercel.app';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get_preapproval(): Observable<any> {
    const url = `${base_url}/preapproval`;
    return this.http.get(url);
  }

  get_preapproval_by_id(id: string): Observable<any> {
    const url = `${base_url}/preapproval/${id}`;
    return this.http.get(url);
  }
  create_preapproval(data: any): Observable<any> {
    const url = `${base_url}/preapproval`;
    return this.http.post(url, data);
  }

  update_preapproval(data: any, id: string): Observable<any> {
    const url = `${base_url}/preapproval/${id}`;
    return this.http.put(url, data);
  }

  get_preapproval_plan(): Observable<any> {
    const url = `${base_url}/preapproval_plan`;
    return this.http.get(url);
  }

  get_preapproval_plan_by_id(id: string): Observable<any> {
    const url = `${base_url}/preapproval_plan/${id}`;
    return this.http.get(url);
  }

  create_preapproval_plan(data: any): Observable<any> {
    const url = `${base_url}/preapproval_plan`;
    return this.http.post(url, data);
  }

  update_preapproval_plan(data: any, id: string): Observable<any> {
    const url = `${base_url}/preapproval_plan/${id}`;
    return this.http.put(url, data);
  }
}
