import DECIMAL_PRECISION from './decimalPrecision';

const formatQuantity = (originalPrice: number): number => {
  const rounded = Math.round(originalPrice);
  return rounded / DECIMAL_PRECISION;
};

export default formatQuantity;
