import { useContext } from 'react';

import CartItemAPIContext, { Value } from './CartItemAPIContext';

const useCartItemAPI = (): Value => useContext(CartItemAPIContext);

export default useCartItemAPI;
