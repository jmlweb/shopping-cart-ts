import Product from '../Product';

interface ProductAdapter {
  get(code: string): Promise<Product | undefined>;

  // Note: This should be replaced in a real context by a find method
  // accepting filters, pagination and order params, etc
  list(): Promise<ReadonlyArray<Product>>;
}

export default ProductAdapter;
