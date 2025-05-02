import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import {Order, OrderToSend} from '../interfaces/order';
import {OrderProduct} from '../interfaces/order-product';
import {Product} from '../interfaces/product'
import {Customer} from '../interfaces/customer';
import {Employee} from '../interfaces/employee';
import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  getOrderToSendFromOrder(order: Order): OrderToSend {
    return {
      id: order.id,
      customerId: order.customer.id,
      products: order.products.map((p: Product) => {
        return {id: p.id, quantity: p.quantity!}
      })
    }
  }

  getOrderAfterUpdate(order: Order, customer: Customer, products: Product[]): Order {
    return {
      ...order,
      products: products,
      customer: customer
    }
  }

  dateNotPastThanTodayValidator(formControl: AbstractControl): ValidationErrors | null {
    const isValid = new Date(formControl.value) <= new Date()
    return isValid ? null : {dateIsPastThanToday: true}
  }

  uniqueProductIdValidator(formArray: AbstractControl): ValidationErrors | null {
    const productIds = (formArray as FormArray).controls.map(c => c.value.id)
    const notUniqueIds = productIds.filter((idBeingCompared: number | null) => {
      if (idBeingCompared == null) return false

      return productIds.filter(id => id === idBeingCompared).length > 1
    })

    const nonDuplicatedIds = Array.from(new Set(notUniqueIds)).map(id => parseInt(id))
    if (notUniqueIds.length >= 1) return {notUniqueProductIds: nonDuplicatedIds}

    return null
  }

  getAll() {
    return this.http.get<Order[]>(`${baseApiUrl}/order`)
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
}
