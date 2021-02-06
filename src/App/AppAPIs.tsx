import { FC } from 'react';
import ProductRepository from '../logic/domain/ProductRepository';
import ProductMockAdapter from '../logic/infrastructure/ProductMockAdapter';
import ProductAPIProvider from '../logic/application/ProductAPI/ProductAPIProvider';
import DiscountRepository from '../logic/domain/DiscountRepository';
import DiscountMockAdapter from '../logic/infrastructure/DiscountMockAdapter';
import DiscountAPIProvider from '../logic/application/DiscountAPI/DiscountAPIProvider';
import CartItemRepository from '../logic/domain/CartItemRepository';
import CartItemMockAdapter from '../logic/infrastructure/CartItemMockAdapter';
import CartItemAPIProvider from '../logic/application/CartItemAPI/CartItemAPIProvider';

const productMockAdapter = new ProductMockAdapter();
const productRepository = new ProductRepository(productMockAdapter);

const discountMockAdapter = new DiscountMockAdapter(productRepository);
const discountRepository = new DiscountRepository(discountMockAdapter);

const cartItemMockAdapter = new CartItemMockAdapter(productRepository);
const cartItemRepository = new CartItemRepository(cartItemMockAdapter);

const AppAPIs: FC = ({ children }) => (
  <ProductAPIProvider productRepository={productRepository}>
    <DiscountAPIProvider discountRepository={discountRepository}>
      <CartItemAPIProvider cartItemRepository={cartItemRepository}>
        {children}
      </CartItemAPIProvider>
    </DiscountAPIProvider>
  </ProductAPIProvider>
);

export default AppAPIs;
