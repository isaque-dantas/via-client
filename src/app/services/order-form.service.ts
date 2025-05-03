import { Injectable } from '@angular/core';
import {Order, OrderToSend} from '../interfaces/order';
import {Product} from '../interfaces/product';
import {Customer} from '../interfaces/customer';
import {AbstractControl, FormArray, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  getOrderToSendFromOrder(order: Order): OrderToSend {
    return {
      id: order.id,
      customer: order.customer.id,
      products: order.products.map((p: Product) => {
        return {id: p.id, quantity: p.quantity!}
      }),
      date: order.date,
      description: order.description
    }
  }

  getOrderAfterUpdate(order: Order, customer: Customer, products: Product[], date: string, description?: string): Order {
    return {
      ...order,
      products: products,
      customer: customer,
      date: date,
      description: description
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
}
