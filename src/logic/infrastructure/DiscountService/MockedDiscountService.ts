import DiscountService from './DiscountService';
import Product from '../../domain/Product';
import TwoPerOneDiscountFactory from '../../domain/Discount/TwoPerOneDiscountFactory';
import PercentDiscountFactory from '../../domain/Discount/PercentDiscountFactory';
import ProductService from '../ProductService/ProductService';

type ProductsMap = {
  [x: string]: Product
};

const DISCOUNTS = [
  {
    name: '2x1 cap offer',
    type: 'twoPerOne',
    product: 'CAP',
  },
  {
    name: 'shirt offer',
    type: 'percent',
    product: 'SHIRT',
    options: {
      discountPercentage: 5,
      minRequired: 3,
    },
  },
];

const MockedDiscountService = (productService: ProductService): DiscountService => ({
  list: async () => {
    const rawProducts = Array.from(
      new Set(DISCOUNTS.map((discount) => discount.product)),
    );
    // Building a map with the unique products in the discounts optimizes the number
    // of required requests to the product service
    const products = await productService.find((product) => rawProducts.includes(product.code));
    const productsMap: ProductsMap = products.reduce(
      (acc, product) => ({
        ...acc,
        [product.code]: product,
      }),
      {} as ProductsMap,
    );
    return DISCOUNTS.map((rawDiscount) => {
      const product = productsMap[rawDiscount.product];
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
    });
  },
});

export default MockedDiscountService;
