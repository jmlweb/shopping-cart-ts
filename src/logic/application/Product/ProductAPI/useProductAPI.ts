import { useContext } from 'react';

import ProductAPIContext, { Value } from './ProductAPIContext';

const useProductAPI = (): Value => useContext(ProductAPIContext);

export default useProductAPI;
