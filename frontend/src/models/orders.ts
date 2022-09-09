import { OrderItem } from './orderItems';

export interface Order {
  id: number;
  code: string;
  name: string;
  user_id: number;
  ambassador_email: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  total: number;
  order_items: OrderItem[];
}
