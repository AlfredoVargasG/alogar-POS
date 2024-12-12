import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/?page=${page}&limit=${limit}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`);
  }

  getIcons(): Observable<any> {
    return this.http.get(`${this.apiUrl}/firebase/`);
  }
}
