import CartItem from '../CartItem';
import Product, { ProductProps } from '../Product';
import Money from '../Money';

type CartManagerProps = {
  product: ProductProps;
  quantity: number;
  total: number;
};

class CartManager {
  static of(cartItems?: ReadonlyArray<CartItem>): CartManager {
    return new CartManager(cartItems);
  }

  cartItems: ReadonlyArray<CartItem>;

  constructor(cartItems: ReadonlyArray<CartItem> = []) {
    this.cartItems = cartItems;
  }

  hasProductInCart(product: Product): boolean {
    return (
      this.cartItems.find((cartItem) => cartItem.hasProduct(product))
      !== undefined
    );
  }

  incrementQuantity(product: Product, quantity: number): CartManager {
    if (this.hasProductInCart(product)) {
      const newCartItems = this.cartItems.map((cartItem) => {
        if (cartItem.hasProduct(product)) {
          return CartItem.of(product, cartItem.quantity + quantity);
        }
        return cartItem;
      });
      return CartManager.of(newCartItems);
    }
    const newCartItems = [...this.cartItems, CartItem.of(product, quantity)];
    return CartManager.of(newCartItems);
  }

  decrementQuantity(product: Product, quantity: number): CartManager {
    if (!this.hasProductInCart(product)) {
      throw new Error('Product not found');
    }
    const newCartItems = this.cartItems.reduce((acc, cartItem) => {
      if (cartItem.hasProduct(product)) {
        const newCartItem = CartItem.of(product, cartItem.quantity - quantity);
        if (newCartItem.isEmpty) {
          return acc;
        }
        return [...acc, newCartItem];
      }
      return [...acc, cartItem];
    }, [] as ReadonlyArray<CartItem>);
    return CartManager.of(newCartItems);
  }

  removeProduct(product: Product): CartManager {
    if (!this.hasProductInCart(product)) {
      throw new Error('Product not found');
    }
    const newCartItems = this.cartItems.filter(
      (cartItem) => !cartItem.hasProduct(product),
    );
    return CartManager.of(newCartItems);
  }

  // eslint-disable-next-line class-methods-use-this
  empty(): CartManager {
    return CartManager.of();
  }

  findByProduct(product: Product): CartItem {
    const result = this.cartItems.find((cartItem) => cartItem.product.isSameThan(product));
    if (!result) {
      throw new Error('Cart Item not found');
    }
    return result;
  }

  render(): ReadonlyArray<CartManagerProps> {
    return this.cartItems.map((cartItem) => ({
      product: cartItem.product.render(),
      quantity: cartItem.quantity,
      total: cartItem.total.formattedValue,
    }));
  }

  get isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  get total(): Money {
    const rawValue = this.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.total.value,
      0,
    );
    return Money.of(rawValue);
  }

  get quantity(): number {
    return this.cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }
}

export default CartManager;
