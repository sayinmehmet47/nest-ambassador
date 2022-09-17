export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface Basket {
  id: number;
  price: number;
  quantity: number;
}

export type IProduct = {
  product_id: number;
  quantity: number;
};

export interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  code: string;
  products: IProduct[];
}
