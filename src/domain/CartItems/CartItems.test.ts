import CartItems from '.';
import CartItem from '../CartItem';
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

const products = INITIAL_VALUE.map((value) => Product.of(value));

const initialCartItems = [
  CartItem.of(products[0], 4),
  CartItem.of(products[1], 4),
  CartItem.of(products[2], 3),
];

describe('CartItems', () => {
  test('it works without initial items', () => {
    const cartItems = CartItems.of();
    expect(cartItems.quantity).toBe(0);
    const cartItems2 = cartItems.incrementQuantity(products[0], 4);
    expect(cartItems2.total.formattedValue).toBe(20);
    const cartItems3 = cartItems2.incrementQuantity(products[1], 4);
    expect(cartItems3.total.formattedValue).toBe(50);
    const result = cartItems3.findByProduct(products[0]);
    expect(result.total.formattedValue).toBe(20);
  });
  test('it works with initial items', () => {
    const cartItems = CartItems.of(initialCartItems);
    expect(cartItems.quantity).toBe(11);
    expect(cartItems.total.formattedValue).toBe(110);
    const cartItems2 = cartItems.decrementQuantity(products[1], 2);
    expect(cartItems2.total.formattedValue).toBe(95);
    const cartItems3 = cartItems2.removeProduct(products[0]);
    expect(cartItems3.total.formattedValue).toBe(75);
    const cartItems4 = cartItems3.decrementQuantity(products[1], 2);
    expect(cartItems4.total.formattedValue).toBe(60);
    expect(cartItems4.cartItems.length).toBe(1);
    expect(cartItems4.render()).toEqual([{
      product: {
        code: 'SHIRT',
        name: 'Lana T-Shirt',
        price: 20,
      },
      quantity: 3,
      total: 60,
    }]);
    const cartItems5 = cartItems4.empty();
    expect(cartItems5.isEmpty).toBe(true);
    expect(cartItems5.total.formattedValue).toBe(0);
  });
  test('throws an error when trying to remove a non-existing product', () => {
    const cartItems = CartItems.of();
    expect(() => {
      cartItems.removeProduct(products[0]);
    }).toThrowError('Product not found');
  });
  test('throws an error when trying to decrement quantity over a non-existing product', () => {
    const cartItems = CartItems.of();
    expect(() => {
      cartItems.decrementQuantity(products[0], 2);
    }).toThrowError('Product not found');
  });
  test('throws an error when trying to find over a non-existing product', () => {
    const cartItems = CartItems.of();
    expect(() => {
      cartItems.findByProduct(products[0]);
    }).toThrowError('Cart Item not found');
  });
});
