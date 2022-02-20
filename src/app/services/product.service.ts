import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductList({ categoryId }: GetParamsProduct = {}): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    const url = categoryId ? searchUrl : this.baseUrl;
    return this.getProducts(url);
  }

  searchProducts(name: string) {
    const url = `${this.baseUrl}/search/findByNameContaining?name=${name}`;
    return this.getProducts(url);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;

    return this.httpClient.get<Product>(url);
  }

  getProducts(url: string) {
    return this.httpClient
      .get<GetResponseProduct>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url = this.categoryUrl;
    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

interface GetParamsProduct {
  categoryId?: number;
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
