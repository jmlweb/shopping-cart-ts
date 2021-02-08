import { FC } from 'react';
import AppAPI from './AppAPI';
import AppQueriesProvider from './AppQueriesProvider';
import ShoppingCartProvider from '../logic/application/ShoppingCart/ShoppingCartProvider';

import ShoppingCart from '../scenes/ShoppingCart';
import './App.css';

/**
 * NOTES:
 * - In a real situation, the scene would be provided by a routing mechanism
 * - The ShoppingCartProvider wraps the whole scene to ensure keeping the state between scenes
 * (sooner or later, we would need to implement a mechanism for adding products to the cart)
 */

const App: FC = () => (
  <AppAPI>
    <AppQueriesProvider>
      <ShoppingCartProvider>
        <ShoppingCart />
      </ShoppingCartProvider>
    </AppQueriesProvider>
  </AppAPI>
);

export default App;
