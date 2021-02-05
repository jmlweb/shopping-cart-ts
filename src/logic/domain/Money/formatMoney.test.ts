import formatMoney from './formatMoney';

describe('formatMoney', () => {
  test('should work for a integer', () => {
    expect(formatMoney(750)).toBe(7.5);
  });
  test('should work for a simple decimal', () => {
    expect(formatMoney(750.10)).toBe(7.5);
  });

  test('should work for a negative number', () => {
    expect(formatMoney(-750)).toBe(-7.5);
  });
  test('should work for a big number near to the lower limit', () => {
    expect(formatMoney(9999.123456)).toBe(99.99);
  });
  test('should work for a big number near to the upper limit', () => {
    expect(formatMoney(9999.999999)).toBe(100);
  });
});
