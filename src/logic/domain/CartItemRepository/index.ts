import CartItem from '../CartItem';
import CartItemAdapter from './CartItemAdapter';

/**
 * The DiscountRepository provides a way of interacting with the Discount(s),
 * without relying on the implementation, which is the responsability of the provided adapter
 */

class CartItemRepository {
  adapter: CartItemAdapter;

  constructor(adapter: CartItemAdapter) {
    this.adapter = adapter;
  }

  list = (): Promise<ReadonlyArray<CartItem>> => this.adapter.list();
}

export default CartItemRepository;
