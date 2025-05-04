import {Order} from './order';
import {Customer} from './customer';

export interface Reports {
  selling_resume: {
    total_amount_invoiced: number,
    total_sold_products_quantity: number,
    orders_quantity: number,
  };
  pending_orders: Order[];
  most_active_customers: Customer[]
}
