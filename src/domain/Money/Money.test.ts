import Money from '.';

describe('Money', () => {
  test('should work properly', () => {
    const money = Money.of(750);
    expect(money.value).toBe(750);
    expect(money.formattedValue).toBe(7.50);
  });
});
