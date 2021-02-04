import CartItemRepository from '.';
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

describe('CartItemRepository', () => {
  test('it works without initial items', () => {
    const cartItemRepository = CartItemRepository.of();
    expect(cartItemRepository.quantity).toBe(0);
    const cartItemRepository2 = cartItemRepository.incrementQuantity(products[0], 4);
    expect(cartItemRepository2.total.formattedValue).toBe(20);
    const cartItemRepository3 = cartItemRepository2.incrementQuantity(products[1], 4);
    expect(cartItemRepository3.total.formattedValue).toBe(50);
    const result = cartItemRepository3.findByProduct(products[0]);
    expect(result.total.formattedValue).toBe(20);
  });
  test('it works with initial items', () => {
    const cartItemRepository = CartItemRepository.of(initialCartItems);
    expect(cartItemRepository.quantity).toBe(11);
    expect(cartItemRepository.total.formattedValue).toBe(110);
    const cartItemRepository2 = cartItemRepository.decrementQuantity(products[1], 2);
    expect(cartItemRepository2.total.formattedValue).toBe(95);
    const cartItemRepository3 = cartItemRepository2.removeProduct(products[0]);
    expect(cartItemRepository3.total.formattedValue).toBe(75);
    const cartItemRepository4 = cartItemRepository3.decrementQuantity(products[1], 2);
    expect(cartItemRepository4.total.formattedValue).toBe(60);
    expect(cartItemRepository4.cartItems.length).toBe(1);
    const cartItemRepository5 = cartItemRepository4.empty();
    expect(cartItemRepository5.isEmpty).toBe(true);
    expect(cartItemRepository5.total.formattedValue).toBe(0);
  });
  test('throws an error when trying to remove a non-existing product', () => {
    const cartItemRepository = CartItemRepository.of();
    expect(() => {
      cartItemRepository.removeProduct(products[0]);
    }).toThrowError('Product not found');
  });
  test('throws an error when trying to decrement quantity over a non-existing product', () => {
    const cartItemRepository = CartItemRepository.of();
    expect(() => {
      cartItemRepository.decrementQuantity(products[0], 2);
    }).toThrowError('Product not found');
  });
  test('throws an error when trying to find over a non-existing product', () => {
    const cartItemRepository = CartItemRepository.of();
    expect(() => {
      cartItemRepository.findByProduct(products[0]);
    }).toThrowError('Cart Item not found');
  });
});
