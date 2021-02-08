import Product, { ProductProps } from '../../domain/Product';

export type FilterFn = (x: ProductProps) => boolean;

interface ProductService {
  get(code: string): Promise<Product>;
  list(): Promise<ReadonlyArray<Product>>;
  find(filterFn: FilterFn): Promise<ReadonlyArray<Product>>;
}

export default ProductService;
