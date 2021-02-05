import formatMoney from './formatMoney';

/**
 * This class handles rounding precision for money amounts
 * It handles integers that can get formatted later with a defined precision.
 * This is useful in the case tomorrow the company decides to use an ERP with a different precision
 * and migrates the DB we just need to change one constant.
 */
class Money {
  static of(value: number): Money {
    return new Money(value);
  }

  private rawValue: number;

  constructor(value: number) {
    this.rawValue = value;
  }

  get value(): number {
    return this.rawValue;
  }

  get formattedValue(): number {
    return formatMoney(this.rawValue);
  }
}

export default Money;
