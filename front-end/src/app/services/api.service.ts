import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    getIcons(carpeta: string) {
        return this.http.get(`${this.apiUrl}/firebase/${carpeta}`);
    }

    getCategories() {
        return this.http.get(`${this.apiUrl}/categories`);
    }

    getProducts() {
        return this.http.get(`${this.apiUrl}/products`);
    }
}