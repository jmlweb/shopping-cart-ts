import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Checkout from './Checkout';
import ProductDetail from './ProductDetail';

const Scenes: FC = () => (
  <Switch>
    <Route path="/product/:code">
      <ProductDetail />
    </Route>
    <Route>
      <Checkout />
    </Route>
  </Switch>
);

export default Scenes;
