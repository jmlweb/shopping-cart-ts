import { createContext } from 'react';
import Discount from '../../domain/Discount';

export type ListFn = () => Promise<ReadonlyArray<Discount>>;
export type Value = {
  list: ListFn,
};

const DiscountAPIContext = createContext({} as Value);

export default DiscountAPIContext;
