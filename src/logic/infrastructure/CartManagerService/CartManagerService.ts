import CartManager from '../../domain/CartManager';

interface CartManagerService {
  get(): Promise<CartManager>
  save(cartManager: CartManager): void
}

export default CartManagerService;
