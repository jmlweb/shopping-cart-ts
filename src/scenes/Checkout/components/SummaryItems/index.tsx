import { FC } from 'react';
import styled from 'styled-components';

import useShoppingCart from '../../../../logic/application/ShoppingCart/useShoppingCart';

const SummaryItemsWrapper = styled.ul`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
  padding: 32px 0;
`;

const SummaryItemsLine = styled.li`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
`;

const SummaryItemsQuantity = styled.span`
  font-size: 14px;
`;

const SummaryItemsAmount = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const SummaryItems: FC = () => {
  const { summary } = useShoppingCart();
  return (
    <SummaryItemsWrapper>
      <SummaryItemsLine>
        <SummaryItemsQuantity>
          {summary.quantity}
          {' '}
          Items
        </SummaryItemsQuantity>
        <SummaryItemsAmount>
          {summary.total}
          {' '}
          €
        </SummaryItemsAmount>
      </SummaryItemsLine>
    </SummaryItemsWrapper>
  );
};

export default SummaryItems;
