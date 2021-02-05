import Discount from '../Discount';
import CartItems from '../CartItems/index';
import Money from '../Money';
import Product from '../Product';

type Summary = {
  quantity: number;
  total: Money;
};

type AppliedDiscount = {
  name: Discount['name'];
  quantity: number;
  total: Money;
};

/**
 * This class overrides the provided instructions on purpose to make it agnostic.
 * In the instructions provided, the scan method is called with a product code, however,
 * in the future the product could be represented by an id, or any other data.
 * Thus the shopping cart method receives the Product when scanning, rejecting or droping an item.
 */

class ShoppingCart {
  static of(
    discounts: ReadonlyArray<Discount>,
    cartItems?: CartItems,
  ): ShoppingCart {
    return new ShoppingCart(discounts, cartItems || CartItems.of([]));
  }

  private discounts: ReadonlyArray<Discount>;

  private cartItems: CartItems;

  constructor(
    discounts: ReadonlyArray<Discount>,
    cartItems: CartItems,
  ) {
    this.discounts = discounts;
    this.cartItems = cartItems;
  }

  scan(product: Product, quantity = 1): ShoppingCart {
    const newCartItems = this.cartItems.incrementQuantity(product, quantity);
    return ShoppingCart.of(this.discounts, newCartItems);
  }

  reject(product: Product, quantity = 1): ShoppingCart {
    const newCartItems = this.cartItems.decrementQuantity(product, quantity);
    return ShoppingCart.of(this.discounts, newCartItems);
  }

  drop(product: Product): ShoppingCart {
    const newCartItems = this.cartItems.removeProduct(product);
    return ShoppingCart.of(this.discounts, newCartItems);
  }

  empty(): ShoppingCart {
    return ShoppingCart.of(this.discounts, this.cartItems.empty());
  }

  get summary(): Summary {
    return {
      quantity: this.cartItems.quantity,
      total: this.cartItems.total,
    };
  }

  get appliedDiscounts(): ReadonlyArray<AppliedDiscount> {
    return this.discounts.reduce((acc, discount) => {
      if (!discount.isValid(this.cartItems)) {
        return acc;
      }
      const appliedDiscount = {
        name: discount.name,
        quantity: discount.count(this.cartItems),
        total: discount.calculate(this.cartItems),
      };
      return [...acc, appliedDiscount];
    }, [] as ReadonlyArray<AppliedDiscount>);
  }

  get total(): Money {
    const discountsAmount = this.appliedDiscounts.reduce(
      (acc, appliedDiscount) => acc + appliedDiscount.total.value,
      0,
    );
    return Money.of(this.cartItems.total.value - discountsAmount);
  }
}

export default ShoppingCart;
