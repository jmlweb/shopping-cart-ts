import Discount from '../Discount';
import DiscountAdapter from './DiscountAdapter';

/**
 * The DiscountRepository provides a way of interacting with the Discount(s),
 * without relying on the implementation, which is the responsability of the provided adapter
 */

class DiscountRepository {
  adapter: DiscountAdapter;

  constructor(adapter: DiscountAdapter) {
    this.adapter = adapter;
  }

  list = (): Promise<ReadonlyArray<Discount>> => this.adapter.list();
}

export default DiscountRepository;
