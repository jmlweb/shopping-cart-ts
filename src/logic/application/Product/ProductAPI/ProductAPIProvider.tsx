import { FC } from 'react';
import ProductRepository from '../../../domain/ProductRepository';
import ProductAPIContext from './ProductAPIContext';

/**
 * This Provider's concern is to pass the "product api" by context.
 * That way, if we need to fetch the info in a different way in the future,
 * we only need to change the resolver in one place
 *
 * We don't want to test the api of react's context and the ProductRepository is already tested
 * That's the reason why we don't want to make unnecesary tests here
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
