import Discount from '.';
import Product from '../Product';
import CartManager from '../CartManager';
import Money from '../Money';

const getCount = (cartManager: CartManager, product: Product) => {
  const { quantity } = cartManager.findByProduct(product);
  return quantity;
};

class PercentDiscountFactory {
  static of(name: string, product: Product, discountPercentage: number, minRequired = 1): Discount {
    return Discount.of({
      name,
      validator: (cartManager: CartManager) => {
        const productIsValid = cartManager.hasProductInCart(product);
        return productIsValid
        && cartManager.findByProduct(product).quantity >= minRequired;
      },
      counter: (cartManager: CartManager) => getCount(cartManager, product),
      calculator: (cartManager: CartManager) => {
        const count = getCount(cartManager, product);
        return Money.of(count * product.price.value * (discountPercentage / 100));
      },
    });
  }
}

export default PercentDiscountFactory;
