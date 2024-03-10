import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://api.enkixnet.com/';

  constructor(private http: HttpClient) {}

  getProductList() {
    return this.http.get<any>(this.url + 'api/products');
  }
}
