import create, { StateCreator } from 'zustand';
import { Basket } from './pages/models/interfaces';

interface BasketSlice {
  baskets: Basket[];
  total: number;
  handleTotal?: () => void;
  handleBasket: (id: number, price: number, quantity: number) => void;
}

export const useBasket = create<BasketSlice>((set) => ({
  baskets: [],
  total: 0,

  handleBasket: (id, price, quantity) =>
    set((state) => {
      const basketIndex = state.baskets.findIndex((b) => b.id === id);
      if (basketIndex >= 0) {
        return {
          baskets: state.baskets.map((basket) =>
            basket.id === id ? { ...basket, quantity: quantity } : basket
          ),
        };
      } else {
        return {
          baskets: [...state.baskets, { id, price, quantity }],
          total: state.baskets.reduce((a, b) => a + b.price * b.quantity, 0),
        };
      }
    }),
  handleTotal: () =>
    set((state) => ({
      total: state.baskets.reduce((a, b) => a + b.price * b.quantity, 0),
    })),
}));
