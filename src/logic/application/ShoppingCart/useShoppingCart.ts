import { useContext } from 'react';

import ShoppingCartContext, { Value } from './ShoppingCartContext';

const useShoppingCart = (): Value => useContext(ShoppingCartContext);

export default useShoppingCart;
