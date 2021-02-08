import { FC, useMemo } from 'react';

import APIContext, { Value } from './APIContext';

type Props = {
  productService: Value['product'];
  discountService: Value['discount'];
  cartManagerService: Value['cartManager'];
};

const APIProvider: FC<Props> = ({
  productService,
  discountService,
  cartManagerService,
  children,
}) => useMemo(
  () => (
    <APIContext.Provider value={{
      product: productService,
      discount: discountService,
      cartManager: cartManagerService,
    }}
    >
      {children}
    </APIContext.Provider>
  ),
  [cartManagerService, discountService, productService, children],
);

export default APIProvider;
