import CartManagerService from './CartManagerService';
import CartItem from '../../domain/CartItem';
import CartManager from '../../domain/CartManager';
import ProductService from '../ProductService/ProductService';

const RAW_CART_ITEMS = [
  {
    product: 'CAP',
    quantity: 4,
  },
  {
    product: 'MUG',
    quantity: 4,
  },
  {
    product: 'SHIRT',
    quantity: 3,
  },
];

const MockedCartManagerService = (productService: ProductService): CartManagerService => ({
  get: async () => {
    const cartItems = await Promise.all(
      RAW_CART_ITEMS.map(
        async (rawCartItem) => {
          const product = await productService.get(rawCartItem.product);
          if (!product) {
            throw new Error('Product not found');
          }
          return CartItem.of(product, rawCartItem.quantity);
        },
      ),
    );
    return CartManager.of(cartItems);
  },
  save: (cartManager: CartManager) => {
    // TODO this needs to be implemented
    // eslint-disable-next-line no-console
    console.log(cartManager);
  },
});

export default MockedCartManagerService;
