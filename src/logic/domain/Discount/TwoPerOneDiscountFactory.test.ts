import TwoPerOneDiscountFactory from './TwoPerOneDiscountFactory';
import DECIMAL_PRECISION from '../Money/decimalPrecision';
import Product from '../Product';
import CartManager from '../CartManager';

const INITIAL_PRODUCT = {
  name: 'Lana T-Shirt',
  code: 'SHIRT',
  price: 20 * DECIMAL_PRECISION,
};

describe('TwoPerOneDiscountFactory', () => {
  const product = Product.of(INITIAL_PRODUCT);
  const discount = TwoPerOneDiscountFactory.of('2x1 t-shirt', product);
  test('it works for a valid discount', () => {
    const cartManager = CartManager.of();
    const updatedCartManager = cartManager.incrementQuantity(product, 2);
    expect(discount.isValid(updatedCartManager)).toBe(true);
    expect(discount.count(updatedCartManager)).toBe(1);
    expect(discount.calculate(updatedCartManager).formattedValue).toBe(20);
  });
  test('it works for an invalid discount', () => {
    const cartManager = CartManager.of();
    const updatedCartManager = cartManager.incrementQuantity(product, 1);
    expect(discount.isValid(updatedCartManager)).toBe(false);
  });
});
