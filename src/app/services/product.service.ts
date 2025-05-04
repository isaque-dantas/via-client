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

  get(id: number) {
    return this.http.get<Product>(`${baseApiUrl}/product/${id}`)
  }

  create(product: Product) {
    return this.http.post<Product>(`${baseApiUrl}/product`, product)
  }

  edit(productId: number, editedProduct: Product) {
    return this.http.put<Product>(`${baseApiUrl}/product/${productId}`, editedProduct)
  }

  delete(productId: number) {
    return this.http.delete<Product>(`${baseApiUrl}/product/${productId}`)
  }
}
