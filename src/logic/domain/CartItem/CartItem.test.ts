import CartItem from '.';
import Product from '../Product';
import DECIMAL_PRECISION from '../Money/decimalPrecision';

describe('CartItem', () => {
  test('should work', () => {
    const cartItem = CartItem.of(Product.of({
      name: 'Lana T-Shirt',
      code: 'SHIRT',
      price: 20 * DECIMAL_PRECISION,
    }), 1);
    expect(cartItem.total.value).toBe(20 * DECIMAL_PRECISION);
  });
});
