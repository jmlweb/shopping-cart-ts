import Discount from '../Discount';

interface DiscountAdapter {
  // Note: This should be replaced in a real context by a find method
  // accepting filters, pagination and order params, etc
  list(): Promise<ReadonlyArray<Discount>>;
}

export default DiscountAdapter;
