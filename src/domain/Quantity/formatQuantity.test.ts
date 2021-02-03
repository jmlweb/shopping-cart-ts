import formatQuantity from './formatQuantity';

describe('formatQuantity', () => {
  test('should work for a integer', () => {
    expect(formatQuantity(750)).toBe(7.5);
  });
  test('should work for a simple decimal', () => {
    expect(formatQuantity(750.10)).toBe(7.5);
  });

  test('should work for a negative number', () => {
    expect(formatQuantity(-750)).toBe(-7.5);
  });
  test('should work for a big number near to the lower limit', () => {
    expect(formatQuantity(9999.123456)).toBe(99.99);
  });
  test('should work for a big number near to the upper limit', () => {
    expect(formatQuantity(9999.999999)).toBe(100);
  });
});
