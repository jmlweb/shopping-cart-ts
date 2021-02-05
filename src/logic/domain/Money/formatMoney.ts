import DECIMAL_PRECISION from './decimalPrecision';

const formatMoney = (originalPrice: number): number => {
  const rounded = Math.round(originalPrice);
  return rounded / DECIMAL_PRECISION;
};

export default formatMoney;
