import { createContext } from 'react';
import Product from '../../domain/Product';

export type GetFn = (code: Product['code']) => Promise<Product>;
export type ListFn = () => Promise<ReadonlyArray<Product>>;
export type Value = {
  get: GetFn,
  list: ListFn,
};

const ProductAPIContext = createContext({} as Value);

export default ProductAPIContext;
