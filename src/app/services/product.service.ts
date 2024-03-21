import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { Category, Product, ProductRequest } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://api.enkixnet.com/api/product/';

  constructor(private http: HttpClient) {}

  getProductList() {
    return this.http.get<any>(this.url + 'getProducts');
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.url + 'createProduct', formData);
  }
}
