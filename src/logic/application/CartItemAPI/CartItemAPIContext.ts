import { createContext } from 'react';
import CartItem from '../../domain/CartItem';

export type ListFn = () => Promise<ReadonlyArray<CartItem>>;
export type Value = {
  list: ListFn,
};

const CartItemAPIContext = createContext({} as Value);

export default CartItemAPIContext;
