import { createContext } from 'react';
import { CartManagerProps } from '../../domain/CartManager';

export type Value = {
  scan: (code: string, quantity?: number) => void,
  reject: (code: string, quantity?: number) => void,
  drop: (code: string) => void,
  empty: () => void,
  items: ReadonlyArray<CartManagerProps>,
  summary: {
    total: number,
    quantity: number,
  },
  appliedDiscounts: ReadonlyArray<{
    name: string,
    quantity: number,
    total: number
  }>,
  total: number
};

const ShoppingCartContext = createContext({} as Value);

export default ShoppingCartContext;
