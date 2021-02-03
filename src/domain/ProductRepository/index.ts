import Product, { ProductProps } from '../Product';

class ProductRepository {
  static of(products: ReadonlyArray<Product>): ProductRepository {
    return new ProductRepository(products);
  }

  products: ReadonlyArray<Product>;

  constructor(products: ReadonlyArray<Product>) {
    this.products = products;
  }

  addProduct(product: Product): ProductRepository {
    const newProducts = [...this.products, product];
    return ProductRepository.of(newProducts);
  }

  removeProduct(productCode: Product['code']): ProductRepository {
    const newProducts = this.products.filter(({ code }) => code !== productCode);
    return ProductRepository.of(newProducts);
  }

  render(): ReadonlyArray<ProductProps> {
    return this.products.map((product) => product.render());
  }
}

export default ProductRepository;
