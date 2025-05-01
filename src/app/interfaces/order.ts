import {OrderProduct} from './order-product';

export interface Order {
  id: number;
  customerId: number;
  products: OrderProduct[];
}

// {
//   'customer': customer.id,
//   'products': [{'id': product_1.id, 'quantity': 2}, {'id': product_2.id, 'quantity': 3}]
// }
