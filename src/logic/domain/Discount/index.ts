import CartManager from '../CartManager';
import Money from '../Money';

export type DiscountValidator = (cartManager: CartManager) => boolean;
export type DiscountCounter = (cartManager: CartManager) => number;
export type DiscountCalculator = (cartManager: CartManager) => Money;

type DiscountProps = {
  name: string;
  validator: DiscountValidator;
  counter: DiscountCounter;
  calculator: DiscountCalculator;
};

/**
 * The Discount class is agnostic to the implementation.
 * That way, we could fullfill the product team requirements in the future.
 * Let's suppose they want to implement a discount for a product but only in the case
 * the cart amount is greather than X.
 * We would just need to create the specific implementation with a proper factory which
 * will return a new Discount implementing the proper rules.
 * That's also why the discount methods receive all the items in the cart, instead of just one.
 */

class Discount {
  static of(discountProps: DiscountProps): Discount {
    return new Discount(discountProps);
  }

  name: DiscountProps['name'];

  private validator: DiscountProps['validator'];

  private counter: DiscountProps['counter'];

  private calculator: DiscountProps['calculator'];

  constructor({
    name, validator, counter, calculator,
  }: DiscountProps) {
    this.name = name;
    this.validator = validator;
    this.counter = counter;
    this.calculator = calculator;
  }

  isValid(cartManager: CartManager): boolean {
    return this.validator(cartManager);
  }

  count(cartManager: CartManager): number {
    return this.counter(cartManager);
  }

  calculate(cartManager: CartManager): Money {
    return this.calculator(cartManager);
  }
}

export default Discount;
