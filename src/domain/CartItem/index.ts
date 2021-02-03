import Product from '../Product';

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

  addQuantity(quantity: number): CartItem {
    return CartItem.of(this.product, this.quantity + quantity);
  }

  removeQuantity(quantity: number): CartItem {
    // make sure we never go under zero
    const newQuantity = Math.max(0, this.quantity - quantity);
    return CartItem.of(this.product, newQuantity);
  }

  get total(): number {
    return this.quantity * this.product.price.value;
  }

  get formattedTotal(): number {
    return this.quantity * this.product.price.formattedValue;
  }
}

export default CartItem;
