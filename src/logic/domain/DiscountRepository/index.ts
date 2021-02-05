import Discount from '../Discount';
import DiscountAdapter from './DiscountAdapter';

class DiscountRepository {
  adapter: DiscountAdapter;

  constructor(adapter: DiscountAdapter) {
    this.adapter = adapter;
  }

  list = (): Promise<ReadonlyArray<Discount>> => this.adapter.list();
}

export default DiscountRepository;
