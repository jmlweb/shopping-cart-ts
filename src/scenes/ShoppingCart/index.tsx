import { FC } from 'react';
import ShoppingCartView from './ShoppingCartView';
import useShoppingCart from '../../logic/application/ShoppingCart/useShoppingCart';

const ShoppingCart: FC = () => {
  const shoppingCart = useShoppingCart();
  console.log(shoppingCart);
  return <ShoppingCartView />;
};

export default ShoppingCart;
