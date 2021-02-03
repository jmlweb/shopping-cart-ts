/**
 * INTEGRATION TEST
 * Verifies that the different shopping cart parts work alltogether
 */

import { render, screen } from '@testing-library/react';

import ShoppingCart from '.';

describe('ShoppingCart', () => {
  test('Shows 3 products with the expected product codes', () => {
    render(<ShoppingCart />);
    expect(screen.getByText('Product code X7R2OPX')).toBeInTheDocument();
    expect(screen.getByText('Product code X2G2OPZ')).toBeInTheDocument();
    expect(screen.getByText('Product code X3W2OPY')).toBeInTheDocument();
  });
  test('Shows the proper number of items', () => {
    render(<ShoppingCart />);
    expect(screen.getByText('11 Items')).toBeInTheDocument();
  });
  test('Shows the proper discounts', () => {
    render(<ShoppingCart />);
    expect(screen.getByText('2x1 Mug offer')).toBeInTheDocument();
    expect(screen.getByText('x3 Shirt offer')).toBeInTheDocument();
    expect(screen.getByText('Promo code')).toBeInTheDocument();
  });
  test('Shows the proper total price', () => {
    render(<ShoppingCart />);
    const wrapper = screen.getByText('107€');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('class', 'summary-total-price');
  });
});
