import { FC } from 'react';
import styled from 'styled-components';

import useShoppingCart from '../../../../logic/application/ShoppingCart/useShoppingCart';
import ActionButton from '../../../../components/ActionButton';

const SummaryTotalWrapper = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.border}`};
  color: #212240;
  display: grid;
  grid-template-rows: repeat(auto);
  grid-gap: 24px;
`;

const SummaryTotalList = styled.ul`
  list-style: none;
`;

const SummaryTotalItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 17px;
  align-items: baseline;
`;

const SummaryTotalDescription = styled.span`
  flex-basis: 100%;
  text-transform: uppercase;
`;

const SummaryTotalAmount = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 20px;
  line-height: 25px;
`;

const SummaryTotal: FC = () => {
  const { total } = useShoppingCart();
  return (
    <SummaryTotalWrapper>
      <SummaryTotalList>
        <SummaryTotalItem>
          <SummaryTotalDescription>Total cost</SummaryTotalDescription>
          <SummaryTotalAmount data-testid="checkoutTotalAmount">
            {total}
            €
          </SummaryTotalAmount>
        </SummaryTotalItem>
      </SummaryTotalList>
      <ActionButton>Checkout</ActionButton>
    </SummaryTotalWrapper>
  );
};

export default SummaryTotal;
