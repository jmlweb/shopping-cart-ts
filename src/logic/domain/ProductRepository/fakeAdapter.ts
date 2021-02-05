import ProductAdapter from './ProductAdapter';
import Product from '../Product';
import DECIMAL_PRECISION from '../Money/decimalPrecision';

export const INITIAL_VALUE = [
  {
    code: 'CAP',
    name: 'Lana Cap',
    price: 5,
  },
  {
    code: 'MUG',
    name: 'Lana Coffee Mug',
    price: 7.5,
  },
  {
    code: 'SHIRT',
    name: 'Lana T-Shirt',
    price: 20,
  },
];

const products = INITIAL_VALUE.map((value) => Product.of({
  ...value,
  price: value.price * DECIMAL_PRECISION,
}));

const fakeAdapter: ProductAdapter = {
  get: (code) => {
    const result = INITIAL_VALUE.find((value) => value.code === code);
    return Promise.resolve(result ? Product.of({
      ...result,
      price: result.price * DECIMAL_PRECISION,
    }) : undefined);
  },
  list: () => Promise.resolve(products),
};

export default fakeAdapter;
