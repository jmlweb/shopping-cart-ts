import ProductRepository from '.';
import Product from '../Product';
import DECIMAL_PRECISION from '../Quantity/decimalPrecision';

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

const initialProducts = [
  Product.of(INITIAL_VALUE[0]),
  Product.of(INITIAL_VALUE[1]),
  Product.of(INITIAL_VALUE[2]),
];

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
  test('should be able to delete an item, producing a new instance', () => {
    const productRepository = ProductRepository.of(initialProducts);
    const newProductRepository = productRepository.removeProduct('SHIRT');
    expect(newProductRepository.render()).toEqual([
      {
        ...INITIAL_VALUE[0],
        price: 5,
      },
      {
        ...INITIAL_VALUE[1],
        price: 7.5,
      },
    ]);
    // the original instance should remain as it was before
    // this way, we could implement an "undo" feature if necessary
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
  test('should be able to add an item', () => {
    const productRepository = ProductRepository.of([
      initialProducts[0],
      initialProducts[1],
    ]);
    const newProductRepository = productRepository.addProduct(initialProducts[2]);
    expect(newProductRepository.render()).toEqual([
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
});
