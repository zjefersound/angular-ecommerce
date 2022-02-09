import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";


  constructor(private httpClient: HttpClient) {}

  getProductList({ categoryId }: GetParams = {}): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    const url = categoryId ? searchUrl : this.baseUrl;

    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetParams {
  categoryId?: number;
}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
