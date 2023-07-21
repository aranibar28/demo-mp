import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const base_url = 'https://server-mercado-pago.vercel.app';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get_planes(): Observable<any> {
    const url = `${base_url}/preapproval_plan`;
    return this.http.get(url);
  }

  get_plan_by_id(id: string): Observable<any> {
    const url = `${base_url}/preapproval_plan/${id}`;
    return this.http.get(url);
  }

  create_plan(data: any): Observable<any> {
    const url = `${base_url}/preapproval_plan`;
    return this.http.post(url, data);
  }

  update_plan(data: any, id: string): Observable<any> {
    const url = `${base_url}/preapproval_plan/${id}`;
    return this.http.put(url, data);
  }
}
