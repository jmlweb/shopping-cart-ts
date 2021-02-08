import Product from '../../domain/Product';
import DECIMAL_PRECISION from '../../domain/Money/decimalPrecision';
import ProductService from './ProductService';

const PRODUCTS = [
  {
    code: 'CAP',
    name: 'Lana Cap',
    price: 5 * DECIMAL_PRECISION,
  },
  {
    code: 'SHIRT',
    name: 'Lana T-Shirt',
    price: 20 * DECIMAL_PRECISION,
  },
  {
    code: 'MUG',
    name: 'Lana Coffee Mug',
    price: 7.5 * DECIMAL_PRECISION,
  },
];

const MockedProductService = (): ProductService => ({
  get: (code) => {
    const result = PRODUCTS.find((item) => item.code === code);
    if (!result) {
      throw new Error('Product not found');
    }
    return Promise.resolve(Product.of(result));
  },
  list: () => Promise.resolve(
    PRODUCTS.map((item) => Product.of(item)),
  ),
  find: (filterFn) => Promise.resolve(
    PRODUCTS.filter(filterFn).map((item) => Product.of(item)),
  ),
});

export default MockedProductService;
