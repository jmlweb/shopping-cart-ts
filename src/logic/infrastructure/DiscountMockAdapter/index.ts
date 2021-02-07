import Discount from '../../domain/Discount';
import DiscountAdapter from '../../domain/DiscountRepository/DiscountAdapter';
import ProductRepository from '../../domain/ProductRepository';
import TwoPerOneDiscountFactory from '../../domain/Discount/TwoPerOneDiscountFactory';
import PercentDiscountFactory from '../../domain/Discount/PercentDiscountFactory';

/**
 * The DiscountAdapter interface defines the behavior of the adapter
 * We don't want to test the implementation here as it is a mock
 */

class DiscountMockAdapter implements DiscountAdapter {
  static data = [
    {
      name: '2x1 cap offer',
      type: 'twoPerOne',
      product: 'CAP',
    },
    {
      name: 'mug offer',
      type: 'percent',
      product: 'SHIRT',
      options: {
        discountPercentage: 5,
        minRequired: 3,
      },
    },
  ];

  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  // eslint-disable-next-line class-methods-use-this
  list = async (): Promise<ReadonlyArray<Discount>> => {
    const result = await Promise.all(
      DiscountMockAdapter.data.map(async (rawDiscount) => {
        const product = await this.productRepository.get(rawDiscount.product);
        switch (rawDiscount.type) {
          case 'twoPerOne':
            return TwoPerOneDiscountFactory.of(rawDiscount.name, product);
          case 'percent':
            if (!rawDiscount.options?.discountPercentage) {
              throw new Error('Please, specify a discount amount');
            }
            return PercentDiscountFactory.of(
              rawDiscount.name,
              product,
              rawDiscount.options?.discountPercentage,
              rawDiscount.options?.minRequired,
            );
          default:
            throw new Error('Discount not supported');
        }
      }),
    );
    return result;
  };
}

export default DiscountMockAdapter;
