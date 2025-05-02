import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import {Product} from '../interfaces/product';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient)
  fb = inject(FormBuilder)
  maxIntegerValue = 999999999

  productGroupFactory() {
    return this.fb.group({
      id: new FormControl<number | null>(null, Validators.required),
      quantity: [1, [Validators.min(1), Validators.max(this.maxIntegerValue)]],
    })
  }

  getAll() {
    return this.http.get<Product[]>(`${baseApiUrl}/product`)
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
