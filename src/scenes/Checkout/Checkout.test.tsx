/* eslint-disable @typescript-eslint/await-thenable */
/**
 * INTEGRATION TEST
 * Verifies that the different shopping cart parts work alltogether
 */

import {
  render, screen, within, fireEvent, act,
} from '../../testUtils';

import ShoppingCart from '.';

const el = (
  <ShoppingCart />
);

describe('ShoppingCart', () => {
  test('Shows 3 products with the expected product codes', async () => {
    render(el);
    expect(await screen.findByText(/Product code CAP/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product code MUG/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product code SHIRT/i)).toBeInTheDocument();
  });
  test('Shows the proper number of items', async () => {
    render(el);
    expect(await screen.findByText(/11 Items/i)).toBeInTheDocument();
  });
  test('Shows the proper discounts', async () => {
    render(el);
    expect(await screen.findByText(/x2 2x1 cap offer/i)).toBeInTheDocument();
    expect(await screen.findByText(/x3 shirt offer/i)).toBeInTheDocument();
  });
  test('Shows the proper total price', () => {
    render(el);
    const wrapper = screen.getByText(/97€/i);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('data-testid', 'checkoutTotalAmount');
  });
  test('it is possible to increase the quantity', async () => {
    render(el);
    const rows = screen.getAllByTestId('checkoutProductRow');
    const button = within(rows[1]).getByTestId('checkoutScan');
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      fireEvent.click(button);
    });
    expect(await screen.findByText(/12 Items/i)).toBeInTheDocument();
  });
  test('it is possible to decrease the quantity and the applied discounts respond', async () => {
    render(el);
    const rows = screen.getAllByTestId('checkoutProductRow');
    const button = within(rows[0]).getByTestId('checkoutReject');
    await act(async () => {
      await fireEvent.click(button);
    });
    expect(await screen.findByText(/10 Items/i)).toBeInTheDocument();
    expect(screen.queryByText(/x2 2x1 cap offer/i)).not.toBeInTheDocument();
    expect(screen.getByText(/2x1 cap offer/i)).toBeInTheDocument();
  });
  test('The product item dissapears once there are no units', async () => {
    render(el);
    const rows = screen.getAllByTestId('checkoutProductRow');
    const button = within(rows[0]).getByTestId('checkoutReject');
    await act(async () => {
      await fireEvent.click(button);
      await fireEvent.click(button);
      await fireEvent.click(button);
      await fireEvent.click(button);
    });
    expect(await screen.findByText(/7 Items/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('checkoutProductRow')).toHaveLength(2);
    expect(screen.queryByText(/x2 2x1 cap offer/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/2x1 cap offer/i)).not.toBeInTheDocument();
  });
});
