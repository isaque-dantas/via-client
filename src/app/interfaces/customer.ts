import {Order} from './order';

export interface Customer {
  id: number;
  name: string;
  email: string;
  orders_count?: number;
  orders: Order[];
}
