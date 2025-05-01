import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '../app.config';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient)

  getAll() {
    return this.http.get<Customer[]>(`${baseApiUrl}/customer`)
  }

  create(customer: Customer) {
    return this.http.post<Customer>(`${baseApiUrl}/customer`, customer)
  }

  delete(customerId: number) {
    return this.http.delete<void>(`${baseApiUrl}/customer/${customerId}`)
  }

  edit(customerId: number, customer: Customer) {
    return this.http.put<void>(`${baseApiUrl}/customer/${customerId}`, customer)
  }
}
