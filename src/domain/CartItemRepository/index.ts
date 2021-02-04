import CartItem from '../CartItem';
import Product from '../Product';
import Money from '../Money';

class CartItemRepository {
  static of(cartItems?: ReadonlyArray<CartItem>): CartItemRepository {
    return new CartItemRepository(cartItems);
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

  incrementQuantity(product: Product, quantity: number): CartItemRepository {
    if (this.hasProductInCart(product)) {
      const newCartItems = this.cartItems.map((cartItem) => {
        if (cartItem.hasProduct(product)) {
          return CartItem.of(product, cartItem.quantity + quantity);
        }
        return cartItem;
      });
      return CartItemRepository.of(newCartItems);
    }
    const newCartItems = [
      ...this.cartItems,
      CartItem.of(product, quantity),
    ];
    return CartItemRepository.of(newCartItems);
  }

  decrementQuantity(product: Product, quantity: number): CartItemRepository {
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
    return CartItemRepository.of(newCartItems);
  }

  removeProduct(product: Product): CartItemRepository {
    if (!this.hasProductInCart(product)) {
      throw new Error('Product not found');
    }
    const newCartItems = this.cartItems.filter((cartItem) => !cartItem.hasProduct(product));
    return CartItemRepository.of(newCartItems);
  }

  // eslint-disable-next-line class-methods-use-this
  empty(): CartItemRepository {
    return CartItemRepository.of();
  }

  findByProduct(product: Product): CartItem {
    const result = this.cartItems.find((cartItem) => cartItem.product.isSameThan(product));
    if (!result) {
      throw new Error('Cart Item not found');
    }
    return result;
  }

  get isEmpty(): boolean {
    return this.cartItems.length === 0;
  }

  get total(): Money {
    const rawValue = this.cartItems.reduce((acc, cartItem) => acc + cartItem.total.value, 0);
    return Money.of(rawValue);
  }

  get quantity(): number {
    return this.cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }
}

export default CartItemRepository;
