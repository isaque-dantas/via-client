import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import {Product} from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)

  getAll() {
    return this.http.get<Product[]>(`${baseApiUrl}/product`)
  }

  create(product: Product) {
    return this.http.post<Product>(`${baseApiUrl}/product`, product)
  }

  edit(productId: number, newProductData: Product) {
    return this.http.put<Product>(`${baseApiUrl}/product/${productId}`, newProductData)
  }

  delete(productId: number) {
    return this.http.delete<Product>(`${baseApiUrl}/product/${productId}`)
  }
}
