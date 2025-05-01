import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  getAll() {
    return this.http.get<Order[]>(`${baseApiUrl}/order`)
  }

  create(order: Order) {
    return this.http.post<Order>(`${baseApiUrl}/order`, order)
  }

  edit(orderId: number, editedOrder: Order) {
    return this.http.put<Order>(`${baseApiUrl}/order/${orderId}`, editedOrder)
  }

  delete(orderId: number) {
    return this.http.delete<Order>(`${baseApiUrl}/order/${orderId}`)
  }
}
