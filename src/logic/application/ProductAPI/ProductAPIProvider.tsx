import { FC } from 'react';
import ProductRepository from '../../domain/ProductRepository';
import ProductAPIContext from './ProductAPIContext';

/**
 * This Provider's concern is to pass the "product api" by context.
 * That way, if we need to fetch the info in a different way in the future,
 * we only need to change the resolver in one place
 *
 * There are some reasons why there are no tests:
 * - The React Context API is already tested by React maintainers.
 * - The ProductRepository is tested in his module
 * - TypeScript takes care of semantic errors
 */
type Props = {
  productRepository: ProductRepository,
};

const ProductAPIProvider: FC<Props> = ({ productRepository, children }) => {
  const value = {
    get: productRepository.get,
    list: productRepository.list,
  };
  return (
    <ProductAPIContext.Provider value={value}>
      {children}
    </ProductAPIContext.Provider>
  );
};

export default ProductAPIProvider;
