import { FC } from 'react';
import CartItemRepository from '../../domain/CartItemRepository';
import CartItemAPIContext from './CartItemAPIContext';

/**
 * This Provider's concern is to pass the "cartItem api" by context.
 * That way, if we need to fetch the info in a different way in the future,
 * we only need to change the resolver in one place
 *
 * There are some reasons why there are no tests:
 * - The React Context API is already tested by React maintainers.
 * - The ProductRepository is tested in his module
 * - TypeScript takes care of semantic errors
 */
type Props = {
  cartItemRepository: CartItemRepository,
};

const CartItemAPIProvider: FC<Props> = ({ cartItemRepository, children }) => {
  const value = {
    list: cartItemRepository.list,
  };
  return (
    <CartItemAPIContext.Provider value={value}>
      {children}
    </CartItemAPIContext.Provider>
  );
};

export default CartItemAPIProvider;
