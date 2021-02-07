/**
 * INTEGRATION TEST
 * Verifies that the different shopping cart parts work alltogether
 */

import { render, screen } from '@testing-library/react';
import ShoppingCartProvider from '../../logic/application/ShoppingCart/ShoppingCartProvider';
import AppQueriesProvider from '../../App/AppQueriesProvider';
import AppAPIs from '../../App/AppAPIs';

import ShoppingCart from '.';

const el = (
  <AppAPIs>
    <AppQueriesProvider>
      <ShoppingCartProvider>
        <ShoppingCart />
      </ShoppingCartProvider>
    </AppQueriesProvider>
  </AppAPIs>
);

describe('ShoppingCart', () => {
  test('Shows 3 products with the expected product codes', async () => {
    render(el);
    expect(await screen.findByText('Product code CAP')).toBeInTheDocument();
    expect(await screen.findByText('Product code MUG')).toBeInTheDocument();
    expect(await screen.findByText('Product code SHIRT')).toBeInTheDocument();
  });
  test('Shows the proper number of items', async () => {
    render(el);
    expect(await screen.findByText('11 Items')).toBeInTheDocument();
  });
  test('Shows the proper discounts', async () => {
    render(el);
    expect(await screen.findByText('x2 2x1 cap offer')).toBeInTheDocument();
    expect(await screen.findByText('x3 shirt offer')).toBeInTheDocument();
  });
  test('Shows the proper total price', () => {
    render(el);
    const wrapper = screen.getByText('97€');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('class', 'summary-total-price');
  });
});
