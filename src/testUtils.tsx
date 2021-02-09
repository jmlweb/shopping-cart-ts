import { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import theme from './theme';
import ShoppingCartProvider from './logic/application/ShoppingCart/ShoppingCartProvider';
import AppQueriesProvider from './App/AppQueriesProvider';
import AppAPI from './App/AppAPI';

const AllTheProviders: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AppAPI>
      <AppQueriesProvider>
        <ShoppingCartProvider>
          <MemoryRouter>
            {children}
          </MemoryRouter>
        </ShoppingCartProvider>
      </AppQueriesProvider>
    </AppAPI>
  </ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options: RenderOptions = {},
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

// override render method
export { customRender as render };
