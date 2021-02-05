import Discount from '.';
import Product from '../Product';
import CartItems from '../CartItems';
import Money from '../Money';

const getCount = (cartItems: CartItems, product: Product) => {
  const { quantity } = cartItems.findByProduct(product);
  return Math.floor(quantity / 2);
};

class TwoPerOneDiscountFactory {
  static of(name: string, product: Product): Discount {
    return Discount.of({
      name,
      validator: (cartItems: CartItems) => {
        const productIsValid = cartItems.hasProductInCart(product);
        return productIsValid
        && cartItems.findByProduct(product).quantity >= 2;
      },
      counter: (cartItems: CartItems) => getCount(cartItems, product),
      calculator: (cartItems: CartItems) => {
        const count = getCount(cartItems, product);
        return Money.of(count * product.price.value);
      },
    });
  }
}

export default TwoPerOneDiscountFactory;
