import { FC } from 'react';
import DiscountRepository from '../../domain/DiscountRepository';
import DiscountAPIContext from './DiscountAPIContext';

/**
 * This Provider's concern is to pass the "discount api" by context.
 * That way, if we need to fetch the info in a different way in the future,
 * we only need to change the resolver in one place
 *
 * There are some reasons why there are no tests:
 * - The React Context API is already tested by React maintainers.
 * - The ProductRepository is tested in his module
 * - TypeScript takes care of semantic errors
 */
type Props = {
  discountRepository: DiscountRepository,
};

const DiscountAPIProvider: FC<Props> = ({ discountRepository, children }) => {
  const value = {
    list: discountRepository.list,
  };
  return (
    <DiscountAPIContext.Provider value={value}>
      {children}
    </DiscountAPIContext.Provider>
  );
};

export default DiscountAPIProvider;
