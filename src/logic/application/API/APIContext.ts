import { createContext } from 'react';

import ProductService from '../../infrastructure/ProductService/ProductService';
import DiscountService from '../../infrastructure/DiscountService/DiscountService';
import CartManagerService from '../../infrastructure/CartManagerService/CartManagerService';

export type Value = {
  product: ProductService,
  discount: DiscountService,
  cartManager: CartManagerService,
};

const APIContext = createContext({} as Value);

export default APIContext;
