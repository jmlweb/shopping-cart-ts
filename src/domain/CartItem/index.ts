import Product from '../Product';
import Money from '../Money';

class CartItem {
  static of(product: Product, quantity: number): CartItem {
    return new CartItem(product, quantity);
  }

  product: Product;

  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  hasProduct(product: Product): boolean {
    return this.product.isSameThan(product);
  }

  get total(): Money {
    return Money.of(this.quantity * this.product.price.value);
  }

  get isEmpty(): boolean {
    return this.quantity <= 0;
  }
}

export default CartItem;
