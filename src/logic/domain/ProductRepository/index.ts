import ProductAdapter from './ProductAdapter';
import Product, { ProductProps } from '../Product';

/**
 * The ProductRepository provides a way of interacting with the Product(s),
 * without relying on the implementation, which is the responsability of the provided adapter
 */
class ProductRepository {
  adapter: ProductAdapter;

  constructor(adapter: ProductAdapter) {
    this.adapter = adapter;
  }

  get = async (id: Product['code']): Promise<Product> => {
    const product = await this.adapter.get(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  };

  list = (): Promise<ReadonlyArray<Product>> => this.adapter.list();

  render = async (): Promise<ReadonlyArray<ProductProps>> => {
    const products = await this.list();
    return products.map((product) => product.render());
  };
}

export default ProductRepository;
