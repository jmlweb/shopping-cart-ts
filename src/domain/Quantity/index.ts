import formatQuantity from './formatQuantity';

class Quantity {
  static of(value: number): Quantity {
    return new Quantity(value);
  }

  private rawValue: number;

  constructor(value: number) {
    this.rawValue = value;
  }

  get value(): number {
    return this.rawValue;
  }

  get formattedValue(): number {
    return formatQuantity(this.rawValue);
  }
}

export default Quantity;
