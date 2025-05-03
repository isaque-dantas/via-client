import {OrderProduct} from './order-product';
import {Customer} from './customer';
import {Product} from './product';
import {Employee} from './employee';

export interface OrderToSend {
  id: number;
  customer: number;
  products: OrderProduct[];
  date: string;
  description?: string;
}

export interface Order {
  id: number;
  customer: Customer;
  employee: Employee;
  products: Product[];
  status: string;
  description?: string;
  date: string;
}
