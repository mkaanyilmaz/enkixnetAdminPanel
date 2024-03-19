import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = 'http://api.enkixnet.com/api/category/';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(this.url + 'getCategories');
  }

  createCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(this.url + 'createCategory', categoryData);
  }
}
