import ProductAdapter from './ProductAdapter';
import Product, { ProductProps, ProductId } from '../Product';

class ProductRepository {
  adapter: ProductAdapter;

  constructor(adapter: ProductAdapter) {
    this.adapter = adapter;
  }

  get = async (id: ProductId): Promise<Product> => {
    const product = await this.adapter.get(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  };

  list(): Promise<ReadonlyArray<Product>> {
    return this.adapter.list();
  }

  render = async (): Promise<ReadonlyArray<ProductProps>> => {
    const products = await this.list();
    return products.map((product) => product.render());
  };
}

export default ProductRepository;
