import ProductRepository from '.';
import Product from '../Product';
import DECIMAL_PRECISION from '../Money/decimalPrecision';

const INITIAL_VALUE = [
  {
    code: 'CAP',
    name: 'Lana Cap',
    price: 5 * DECIMAL_PRECISION,
  },
  {
    code: 'MUG',
    name: 'Lana Coffee Mug',
    price: 7.5 * DECIMAL_PRECISION,
  },
  {
    code: 'SHIRT',
    name: 'Lana T-Shirt',
    price: 20 * DECIMAL_PRECISION,
  },
];

const initialProducts = INITIAL_VALUE.map((value) => Product.of(value));

describe('ProductRepository', () => {
  test('should be able to create a repository', () => {
    const productRepository = ProductRepository.of(initialProducts);
    expect(productRepository.render()).toEqual([
      {
        ...INITIAL_VALUE[0],
        price: 5,
      },
      {
        ...INITIAL_VALUE[1],
        price: 7.5,
      },
      {
        ...INITIAL_VALUE[2],
        price: 20,
      },
    ]);
  });
  test('should be able to find by code', () => {
    const productRepository = ProductRepository.of(initialProducts);
    const result = productRepository.findByCode('CAP');
    expect(result.isSameThan(initialProducts[0])).toBe(true);
  });
});
