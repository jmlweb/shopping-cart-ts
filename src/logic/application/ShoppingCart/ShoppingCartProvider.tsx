import {
  FC, useState, useCallback, useMemo,
} from 'react';
import { useQuery } from 'react-query';

import Discount from '../../domain/Discount';
import ShoppingCart from '../../domain/ShoppingCart';
import useDiscountAPI from '../DiscountAPI/useDiscountAPI';
import useProductAPI from '../ProductAPI/useProductAPI';
import useCartItemAPI from '../CartItemAPI/useCartItemAPI';
import ShoppingCartContext from './ShoppingCartContext';
import CartManager from '../../domain/CartManager';

type Props = {
  discounts: ReadonlyArray<Discount>;
  cartManager: CartManager,
};

const ShoppingCartProvider: FC<Props> = ({ discounts, cartManager, children }) => {
  const productAPI = useProductAPI();
  const [shoppingCart, setShoppingCart] = useState(() => ShoppingCart.of(discounts, cartManager));

  // The reason for not relying on the current store for the product list is that
  // it may have changed (ex: pagination)
  const scan = useCallback(
    async (code: string, quantity = 1) => {
      const product = await productAPI.get(code);
      const newShoppingCart = shoppingCart.scan(product, quantity);
      setShoppingCart(newShoppingCart);
    },
    [productAPI, shoppingCart],
  );

  const reject = useCallback(
    async (code: string, quantity = 1) => {
      const product = await productAPI.get(code);
      const newShoppingCart = shoppingCart.reject(product, quantity);
      setShoppingCart(newShoppingCart);
    },
    [productAPI, shoppingCart],
  );

  const drop = useCallback(
    async (code: string) => {
      const product = await productAPI.get(code);
      const newShoppingCart = shoppingCart.drop(product);
      setShoppingCart(newShoppingCart);
    },
    [productAPI, shoppingCart],
  );

  const empty = useCallback(
    () => {
      const newShoppingCart = shoppingCart.empty();
      setShoppingCart(newShoppingCart);
    },
    [shoppingCart],
  );

  const items = useMemo(() => shoppingCart.items, [shoppingCart.items]);
  const summary = useMemo(
    () => ({
      ...shoppingCart.summary,
      total: shoppingCart.summary.total.formattedValue,
    }),
    [shoppingCart.summary],
  );
  const appliedDiscounts = useMemo(
    () => shoppingCart.appliedDiscounts.map((appliedDiscount) => ({
      ...appliedDiscount,
      total: appliedDiscount.total.formattedValue,
    })),
    [shoppingCart.appliedDiscounts],
  );
  const total = useMemo(() => shoppingCart.total.formattedValue, [
    shoppingCart.total.formattedValue,
  ]);

  const value = useMemo(() => ({
    scan,
    reject,
    drop,
    empty,
    items,
    summary,
    appliedDiscounts,
    total,
  }), [appliedDiscounts, drop, empty, items, reject, scan, summary, total]);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

const ShoppingCartProviderWithDependencies: FC = ({ children }) => {
  const discountAPI = useDiscountAPI();
  const cartItemAPI = useCartItemAPI();
  const discounts = useQuery('discounts', discountAPI.list);
  const cartItems = useQuery('cartItems', cartItemAPI.list);
  // TODO: Improve styles
  if (discounts.isLoading || cartItems.isLoading) {
    return <div>Loading...</div>;
  }
  if (discounts.error || cartItems.error) {
    return <div>There was an error. Please, refresh your browser.</div>;
  }

  const cartManager = CartManager.of(cartItems.data);
  return (
    <ShoppingCartProvider discounts={discounts.data || []} cartManager={cartManager}>
      {children}
    </ShoppingCartProvider>
  );
};

export default ShoppingCartProviderWithDependencies;
