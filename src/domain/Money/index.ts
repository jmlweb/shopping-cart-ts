import formatMoney from './formatMoney';

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
