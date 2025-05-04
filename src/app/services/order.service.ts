import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import {Order, OrderToSend} from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  getAll() {
    return this.http.get<Order[]>(`${baseApiUrl}/order`)
  }

  get(orderId: number) {
    return this.http.get<Order>(`${baseApiUrl}/order/${orderId}`)
  }

  getRelatedToCustomer(customerId: number) {
    return this.http.get<Order[]>(`${baseApiUrl}/order?customer_id=${customerId}`)
  }

  getRelatedToProduct(productId: any) {
    return this.http.get<Order[]>(`${baseApiUrl}/order?product_id=${productId}`)
  }

  getRelatedToEmployee(employeeEmail: string) {
    return this.http.get<Order[]>(`${baseApiUrl}/order?employee_email=${employeeEmail}`)
  }

  create(order: OrderToSend) {
    return this.http.post<Order>(`${baseApiUrl}/order`, order)
  }

  edit(orderId: number, editedOrder: OrderToSend) {
    return this.http.put<void>(`${baseApiUrl}/order/${orderId}`, editedOrder)
  }

  delete(orderId: number) {
    return this.http.delete<void>(`${baseApiUrl}/order/${orderId}`)
  }

  patch(orderId: number, status: string) {
    return this.http.patch<void>(`${baseApiUrl}/order/${orderId}`, {status: status})
  }
}
