import Product from '.';
import DECIMAL_PRECISION from '../Quantity/decimalPrecision';

const INITIAL_VALUE = {
  name: 'Lana T-Shirt',
  code: 'SHIRT',
  price: 20 * DECIMAL_PRECISION,
};

describe('Product', () => {
  test('should be able to create a product with a working price', () => {
    const product = Product.of(INITIAL_VALUE);
    expect(product).toBeTruthy();
    expect(product.price.value).toBe(20 * DECIMAL_PRECISION);
    expect(product.price.formattedValue).toBe(20);
    expect(product.render()).toEqual({
      ...INITIAL_VALUE,
      price: 20,
    });
  });
});
