import { FC } from 'react';
import Ground from '../../components/Ground';
import Container from '../../components/Container';
import DividedCard from '../../components/DividedCard';
import CheckoutProducts from './CheckoutProducts';
import CheckoutSummary from './CheckoutSummary';

const Checkout: FC = () => (
  <Ground>
    <Container>
      <DividedCard
        mainContent={<CheckoutProducts />}
        auxContent={<CheckoutSummary />}
      />
    </Container>
  </Ground>
);

export default Checkout;
