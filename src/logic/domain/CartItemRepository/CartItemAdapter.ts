import CartItem from '../CartItem';

interface CartItemAdapter {
  // Note: This should be replaced in a real context by a find method
  // accepting filters, pagination and order params, etc
  list(): Promise<ReadonlyArray<CartItem>>;
}

export default CartItemAdapter;
