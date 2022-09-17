import React from 'react';
import { useState, useEffect } from 'react';
import { Basket, Product } from '../pages/models/interfaces';
import { useBasket } from '../zustand';

type Props = {
  products: Product[];
};

export const Products = ({ products }: Props) => {
  const handleBasket = useBasket((state) => state.handleBasket);
  const handleTotal = useBasket((state) => state.handleTotal);
  const total = useBasket((state) => state.total);

  const handleBasketProducts = (id, price, quantity) => {
    handleBasket(id, price, quantity);
    handleTotal();
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="text-lg font-bold block text-sky-700 ">Products</div>
      <ul className=" text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 ">
        {products.map((product: Product) => {
          return (
            <li
              className="py-4 px-4 w-full rounded-t-lg border-b border-gray-200"
              key={product.id}
            >
              <div className="flex justify-between">
                <div className="font-bold">{product.title}</div>
                <div className="">${product.price}</div>
              </div>
              <div className="py-8">{product.description}</div>
              <div className="flex flex-wrap gap-3 justify-between align-middle">
                <div className="inline-block align-middle text-sky-500">
                  Quantity
                </div>
                <div>
                  <input
                    type="number"
                    onChange={(e) =>
                      handleBasketProducts(
                        product.id,
                        product.price,
                        Number(e.target.value)
                      )
                    }
                    min={0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
            </li>
          );
        })}
        <div className="flex justify-between p-2">
          <div className="font-bold text-base text-red-500">TOTAL</div>
          <div className="">${total}</div>
        </div>
      </ul>
    </div>
  );
};
