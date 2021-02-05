import ShoppingCart from '.';
import Product from '../Product';
import DECIMAL_PRECISION from '../Money/decimalPrecision';
import PercentDiscountFactory from '../Discount/PercentDiscountFactory';
import TwoPerOneDiscountFactory from '../Discount/TwoPerOneDiscountFactory';
import CartItem from '../CartItem';
import CartItems from '../CartItems';

const RAW_PRODUCTS = [
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

const products = RAW_PRODUCTS.map((value) => Product.of(value));

describe('Shopping Cart', () => {
  test('should work for an empty cart', () => {
    const shoppingCart = ShoppingCart.of([]);

    expect(shoppingCart.appliedDiscounts.length).toBe(0);

    expect(shoppingCart.summary.quantity).toBe(0);
    expect(shoppingCart.summary.total.formattedValue).toBe(0);

    expect(shoppingCart.total.formattedValue).toBe(0);

    const shoppingCart2 = shoppingCart.scan(products[0]);

    expect(shoppingCart2.summary.quantity).toBe(1);
    expect(shoppingCart2.summary.total.formattedValue).toBe(5);

    expect(shoppingCart2.total.formattedValue).toBe(5);

    const shoppingCart3 = shoppingCart2.drop(products[0]);

    expect(shoppingCart3.total.formattedValue).toBe(0);
  });
  test('should work for a full cart', () => {
    const discounts = [
      TwoPerOneDiscountFactory.of('2x1 cap offer', products[0]),
      PercentDiscountFactory.of('shirt offer', products[2], 5, 3),
    ];
    const cartItems = CartItems.of([
      CartItem.of(products[0], 4),
      CartItem.of(products[1], 4),
      CartItem.of(products[2], 3),
    ]);
    const shoppingCart = ShoppingCart.of(discounts, cartItems);

    expect(shoppingCart.appliedDiscounts.length).toBe(2);
    // We have 4 units with a price of 5 and 2x1 discount
    expect(shoppingCart.appliedDiscounts[0].total.formattedValue).toBe(10);
    // We have 3 units with a price of 20 and 5% discount
    expect(shoppingCart.appliedDiscounts[1].total.formattedValue).toBe(3);

    expect(shoppingCart.summary.quantity).toBe(11);
    expect(shoppingCart.summary.total.formattedValue).toBe(110);

    expect(shoppingCart.total.formattedValue).toBe(97);

    // We are going to remove 3 units of the cap product, so the discount won't apply now
    const shoppingCart2 = shoppingCart.reject(products[0], 3);

    expect(shoppingCart2.appliedDiscounts.length).toBe(1);
    expect(shoppingCart2.appliedDiscounts[0].total.formattedValue).toBe(3);

    expect(shoppingCart2.summary.quantity).toBe(8);
    expect(shoppingCart2.summary.total.formattedValue).toBe(95);

    expect(shoppingCart2.total.formattedValue).toBe(92);

    const shoppingCart3 = shoppingCart2.empty();

    expect(shoppingCart3.total.formattedValue).toBe(0);
  });
});
