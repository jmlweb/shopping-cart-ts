import Product, { ProductProps } from '../Product';

class ProductRepository {
  static of(products?: ReadonlyArray<Product>): ProductRepository {
    return new ProductRepository(products);
  }

  products: ReadonlyArray<Product>;

  constructor(products: ReadonlyArray<Product> = []) {
    this.products = products;
  }

  addProduct(productToAdd: Product): ProductRepository {
    const newProducts = [...this.products, productToAdd];
    return ProductRepository.of(newProducts);
  }

  removeProduct(productToRemove: Product): ProductRepository {
    const newProducts = this.products.filter((product) => !product.isSameThan(productToRemove));
    if (newProducts.length === this.products.length) {
      throw new Error('Product not found');
    }
    return ProductRepository.of(newProducts);
  }

  findByCode(productCode: Product['code']): Product {
    const result = this.products.find((product) => product.code === productCode);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  }

  render(): ReadonlyArray<ProductProps> {
    return this.products.map((product) => product.render());
  }
}

export default ProductRepository;
