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
    // const cartItemAfterAdd = cartItem.addQuantity(2);
    // expect(cartItemAfterAdd.total.formattedValue).toBe(60);
    // const cartItemAfterRemove = cartItemAfterAdd.decrementQuantity(1);
    // expect(cartItemAfterRemove.total.formattedValue).toBe(40);
  });
  // test('it is not possible to remove under zero', () => {
  //   const cartItem = CartItem.of(Product.of({
  //     name: 'Lana T-Shirt',
  //     code: 'SHIRT',
  //     price: 20 * DECIMAL_PRECISION,
  //   }), 0);
  //   const cartItemAfterRemove = cartItem.decrementQuantity(1);
  //   expect(cartItemAfterRemove.quantity).toBe(0);
  // });
});
