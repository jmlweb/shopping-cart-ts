import CartManager from '.';
import CartItem from '../CartItem';
import Product from '../Product';
import DECIMAL_PRECISION from '../Money/decimalPrecision';

const INITIAL_VALUE = [
  {
    code: 'CAP',
    name: 'Lana Cap',
    price: 5,
  },
  {
    code: 'MUG',
    name: 'Lana Coffee Mug',
    price: 7.5,
  },
  {
    code: 'SHIRT',
    name: 'Lana T-Shirt',
    price: 20,
  },
];

const products = INITIAL_VALUE.map((value) => Product.of({
  ...value,
  price: value.price * DECIMAL_PRECISION,
}));

const initialCartItems = [
  CartItem.of(products[0], 4),
  CartItem.of(products[1], 4),
  CartItem.of(products[2], 3),
];

describe('CartManager', () => {
  test('it works without initial items', () => {
    const cartManager = CartManager.of();
    expect(cartManager.quantity).toBe(0);
    const cartManager2 = cartManager.incrementQuantity(products[0], 4);
    expect(cartManager2.total.formattedValue).toBe(20);
    const cartManager3 = cartManager2.incrementQuantity(products[1], 4);
    expect(cartManager3.total.formattedValue).toBe(50);
    const result = cartManager3.findByProduct(products[0]);
    expect(result.total.formattedValue).toBe(20);
  });
  test('it works with initial items', () => {
    const cartManager = CartManager.of(initialCartItems);
    expect(cartManager.quantity).toBe(11);
    expect(cartManager.total.formattedValue).toBe(110);
    const cartManager2 = cartManager.decrementQuantity(products[1], 2);
    expect(cartManager2.total.formattedValue).toBe(95);
    const cartManager3 = cartManager2.removeProduct(products[0]);
    expect(cartManager3.total.formattedValue).toBe(75);
    const cartManager4 = cartManager3.decrementQuantity(products[1], 2);
    expect(cartManager4.total.formattedValue).toBe(60);
    expect(cartManager4.cartItems.length).toBe(1);
    expect(cartManager4.render()).toEqual([{
      product: {
        code: 'SHIRT',
        name: 'Lana T-Shirt',
        price: 20,
      },
      quantity: 3,
      total: 60,
    }]);
    const cartManager5 = cartManager4.empty();
    expect(cartManager5.isEmpty).toBe(true);
    expect(cartManager5.total.formattedValue).toBe(0);
  });
  test('throws an error when trying to remove a non-existing product', () => {
    const cartManager = CartManager.of();
    expect(() => {
      cartManager.removeProduct(products[0]);
    }).toThrowError('Product not found');
  });
  test('throws an error when trying to decrement quantity over a non-existing product', () => {
    const cartManager = CartManager.of();
    expect(() => {
      cartManager.decrementQuantity(products[0], 2);
    }).toThrowError('Product not found');
  });
  test('throws an error when trying to find over a non-existing product', () => {
    const cartManager = CartManager.of();
    expect(() => {
      cartManager.findByProduct(products[0]);
    }).toThrowError('Cart Item not found');
  });
});
