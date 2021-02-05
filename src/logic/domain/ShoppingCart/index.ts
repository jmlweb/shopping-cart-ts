import Discount from '../Discount';
import CartManager from '../CartManager';
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
 * The Shopping Cart is the core where the different parts work togheter:
 * - Providing an interface to interact with the CartManager provided
 * - Linking the Discounts and the current state of the CartManager to generate applied discounts
 * - Calculating the total amount using the CartManager total and the applied discounts total
 *
 * NOTE:
 * This class overrides the provided instructions on purpose to make it agnostic.
 * In the instructions provided, the scan method is called with a product code, however,
 * in the future the product could be represented by an id, or any other data.
 * The other (even bigger) reason is that providing the code works only if the product is already
 * included in the cart. Otherwise, we are creating a dependency with the product repository,
 * to be able to retrieve the price of the product.
 * Thus the scan method receives the whole Product when scanning, rejecting or droping an item.
 */

class ShoppingCart {
  static of(
    discounts: ReadonlyArray<Discount>,
    cartManager?: CartManager,
  ): ShoppingCart {
    return new ShoppingCart(discounts, cartManager || CartManager.of([]));
  }

  private discounts: ReadonlyArray<Discount>;

  private cartManager: CartManager;

  constructor(
    discounts: ReadonlyArray<Discount>,
    cartManager: CartManager,
  ) {
    this.discounts = discounts;
    this.cartManager = cartManager;
  }

  scan(product: Product, quantity = 1): ShoppingCart {
    const newCartManager = this.cartManager.incrementQuantity(product, quantity);
    return ShoppingCart.of(this.discounts, newCartManager);
  }

  reject(product: Product, quantity = 1): ShoppingCart {
    const newCartManager = this.cartManager.decrementQuantity(product, quantity);
    return ShoppingCart.of(this.discounts, newCartManager);
  }

  drop(product: Product): ShoppingCart {
    const newCartManager = this.cartManager.removeProduct(product);
    return ShoppingCart.of(this.discounts, newCartManager);
  }

  empty(): ShoppingCart {
    return ShoppingCart.of(this.discounts, this.cartManager.empty());
  }

  get summary(): Summary {
    return {
      quantity: this.cartManager.quantity,
      total: this.cartManager.total,
    };
  }

  get appliedDiscounts(): ReadonlyArray<AppliedDiscount> {
    return this.discounts.reduce((acc, discount) => {
      if (!discount.isValid(this.cartManager)) {
        return acc;
      }
      const appliedDiscount = {
        name: discount.name,
        quantity: discount.count(this.cartManager),
        total: discount.calculate(this.cartManager),
      };
      return [...acc, appliedDiscount];
    }, [] as ReadonlyArray<AppliedDiscount>);
  }

  get total(): Money {
    const discountsAmount = this.appliedDiscounts.reduce(
      (acc, appliedDiscount) => acc + appliedDiscount.total.value,
      0,
    );
    return Money.of(this.cartManager.total.value - discountsAmount);
  }
}

export default ShoppingCart;
