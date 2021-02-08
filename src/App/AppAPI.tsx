import { FC } from 'react';
import ProductService from '../logic/infrastructure/ProductService/MockedProductService';
import DiscountService from '../logic/infrastructure/DiscountService/MockedDiscountService';
import CartManagerService from '../logic/infrastructure/CartManagerService/MockedCartManagerService';
import APIProvider from '../logic/application/API/APIProvider';

/**
 * By separating each component by its concern we can use them later inside our tests
 * to avoid repeating loading the services once and again.
 */

const productService = ProductService();
const discountService = DiscountService(productService);
const cartManagerService = CartManagerService(productService);

const AppAPI: FC = ({ children }) => (
  <APIProvider
    productService={productService}
    discountService={discountService}
    cartManagerService={cartManagerService}
  >
    {children}
  </APIProvider>
);

export default AppAPI;
