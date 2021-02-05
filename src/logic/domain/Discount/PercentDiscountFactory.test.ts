import PercentDiscountFactory from './PercentDiscountFactory';
import DECIMAL_PRECISION from '../Money/decimalPrecision';
import Product from '../Product';
import CartManager from '../CartManager';

const INITIAL_PRODUCT = {
  name: 'Lana T-Shirt',
  code: 'SHIRT',
  price: 20 * DECIMAL_PRECISION,
};

describe('PercentDiscountFactory', () => {
  const product = Product.of(INITIAL_PRODUCT);
  const discount = PercentDiscountFactory.of('2x1 t-shirt', product, 5, 3);
  test('it works for a valid discount', () => {
    const cartManager = CartManager.of();
    const updatedCartManager = cartManager.incrementQuantity(product, 4);
    expect(discount.isValid(updatedCartManager)).toBe(true);
    expect(discount.count(updatedCartManager)).toBe(4);
    expect(discount.calculate(updatedCartManager).formattedValue).toBe(4);
  });
  test('it works for an invalid discount', () => {
    const cartManager = CartManager.of();
    const updatedCartManager = cartManager.incrementQuantity(product, 1);
    expect(discount.isValid(updatedCartManager)).toBe(false);
  });
});
