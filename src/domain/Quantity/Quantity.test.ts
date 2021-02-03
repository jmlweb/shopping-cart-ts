import Quantity from '.';

describe('Quantity', () => {
  test('should work properly', () => {
    const quantity = Quantity.of(750);
    expect(quantity.value).toBe(750);
    expect(quantity.formattedValue).toBe(7.50);
  });
});
