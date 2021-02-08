import { FC } from 'react';
import styled from 'styled-components';
import SectionTitle from './components/SectionTitle';
import SummaryItems from './components/SummaryItems';
import AppliedDiscounts from './components/AppliedDiscounts';
import SummaryTotal from './components/SummaryTotal';

const CheckoutSummaryWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.highlight};
  border-radius: 0 4px 4px 0;
  padding: 40px 32px;
  display: flex;
  flex-flow: column wrap;
  color: #212040;
`;

const CheckoutSummary: FC = () => (
  <CheckoutSummaryWrapper>
    <SectionTitle>Order Summary</SectionTitle>
    <SummaryItems />
    <AppliedDiscounts />
    <SummaryTotal />
  </CheckoutSummaryWrapper>
);

export default CheckoutSummary;
