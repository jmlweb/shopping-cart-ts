import Product from '../../domain/Product';
import DECIMAL_PRECISION from '../../domain/Money/decimalPrecision';
import ProductAdapter from '../../domain/ProductRepository/ProductAdapter';

class ProductMockAdapter implements ProductAdapter {
  static data = [
    {
      code: 'CAP',
      name: 'Lana Cap',
      price: 5 * DECIMAL_PRECISION,
    },
    {
      code: 'TSHIRT',
      name: 'Lana T-Shirt',
      price: 20 * DECIMAL_PRECISION,
    },
    {
      code: 'MUG',
      name: 'Lana Coffee Mug',
      price: 7.5 * DECIMAL_PRECISION,
    },
  ];

  // eslint-disable-next-line class-methods-use-this
  get(code: string): Promise<Product | undefined> {
    const result = ProductMockAdapter.data.find((item) => item.code === code);
    return Promise.resolve(result ? Product.of(result) : undefined);
  }

  // eslint-disable-next-line class-methods-use-this
  list(): Promise<ReadonlyArray<Product>> {
    return Promise.resolve(
      ProductMockAdapter.data.map((item) => Product.of(item)),
    );
  }
}

export default ProductMockAdapter;
