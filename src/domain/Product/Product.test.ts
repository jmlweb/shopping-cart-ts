import Product from '.';
import DECIMAL_PRECISION from '../Quantity/decimalPrecision';

describe('Product', () => {
  test('should be able to create a product with a working price', () => {
    const product = Product.of({
      name: 'Lana T-Shirt',
      code: 'SHIRT',
      price: 20 * DECIMAL_PRECISION,
    });
    expect(product).toBeTruthy();
    expect(product.price.value).toBe(20 * DECIMAL_PRECISION);
    expect(product.price.formattedValue).toBe(20);
  });
});
