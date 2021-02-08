import Discount from '../../domain/Discount';

interface DiscountService {
  list(): Promise<ReadonlyArray<Discount>>;
}

export default DiscountService;
