import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import AppAPI from './AppAPI';
import AppQueriesProvider from './AppQueriesProvider';
import ShoppingCartProvider from '../logic/application/ShoppingCart/ShoppingCartProvider';
import Scenes from '../scenes';
import BaseStyles from '../components/BaseStyles';
import theme from '../theme';
// import './App.css';

/**
 * NOTES:
 * - In a real situation, the scene would be provided by a routing mechanism
 * - The ShoppingCartProvider wraps the whole scene to ensure keeping the state between scenes
 * (sooner or later, we would need to implement a mechanism for adding products to the cart)
 */

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <>
      <BaseStyles />
      <AppAPI>
        <AppQueriesProvider>
          <ShoppingCartProvider>
            <BrowserRouter>
              <Scenes />
            </BrowserRouter>
          </ShoppingCartProvider>
        </AppQueriesProvider>
      </AppAPI>
    </>
  </ThemeProvider>
);

export default App;
