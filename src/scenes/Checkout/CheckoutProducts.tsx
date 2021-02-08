import { FC } from 'react';
import styled from 'styled-components';
import SectionTitle from './components/SectionTitle';
import ProductsTable from './components/ProductsTable';

const CheckoutProductsWrapper = styled.section`
  background-color: #fff;
  padding: 40px 32px 40px 56px;
  flex: 1;
  border-radius: 4px 0 0 4px;
`;

const CheckoutProducts: FC = () => (
  <CheckoutProductsWrapper>
    <SectionTitle>Shopping Cart</SectionTitle>
    <ProductsTable />
  </CheckoutProductsWrapper>
);

export default CheckoutProducts;
