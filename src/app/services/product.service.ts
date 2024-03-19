import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { Category, Product } from '../interfaces/interfaces';
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

  createProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.url + 'createProduct', productData);
  }
}
