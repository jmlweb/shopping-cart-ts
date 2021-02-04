import PercentDiscountFactory from './PercentDiscountFactory';
import DECIMAL_PRECISION from '../Money/decimalPrecision';
import Product from '../Product';
import CartItems from '../CartItems';

const INITIAL_PRODUCT = {
  name: 'Lana T-Shirt',
  code: 'SHIRT',
  price: 20 * DECIMAL_PRECISION,
};

describe('PercentDiscountFactory', () => {
  const product = Product.of(INITIAL_PRODUCT);
  const discount = PercentDiscountFactory.of('2x1 t-shirt', product, 5, 3);
  test('it works for a valid discount', () => {
    const cartItems = CartItems.of();
    const updatedCartItems = cartItems.incrementQuantity(product, 4);
    expect(discount.isValid(updatedCartItems)).toBe(true);
    expect(discount.count(updatedCartItems)).toBe(4);
    expect(discount.calculate(updatedCartItems).formattedValue).toBe(4);
  });
  test('it works for an invalid discount', () => {
    const cartItems = CartItems.of();
    const updatedCartItems = cartItems.incrementQuantity(product, 1);
    expect(discount.isValid(updatedCartItems)).toBe(false);
  });
});
