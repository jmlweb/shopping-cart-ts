import CartItem from '../../domain/CartItem';
import CartItemAdapter from '../../domain/CartItemRepository/CartItemAdapter';
import ProductRepository from '../../domain/ProductRepository';

class CartItemMockAdapter implements CartItemAdapter {
  static data = [
    {
      product: 'CAP',
      quantity: 4,
    },
    {
      product: 'MUG',
      quantity: 4,
    },
    {
      product: 'TSHIRT',
      quantity: 3,
    },
  ];

  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  // eslint-disable-next-line class-methods-use-this
  list = async (): Promise<ReadonlyArray<CartItem>> => {
    const result = await Promise.all(
      CartItemMockAdapter.data.map(async (rawCartItem) => {
        const product = await this.productRepository.get(rawCartItem.product);
        return CartItem.of(product, rawCartItem.quantity);
      }),
    );
    return result;
  };
}

export default CartItemMockAdapter;
