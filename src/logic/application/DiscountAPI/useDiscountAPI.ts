import { useContext } from 'react';

import DiscountAPIContext, { Value } from './DiscountAPIContext';

const useDiscountAPI = (): Value => useContext(DiscountAPIContext);

export default useDiscountAPI;
