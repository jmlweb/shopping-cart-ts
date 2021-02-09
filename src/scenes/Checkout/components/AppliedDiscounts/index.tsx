import { FC } from 'react';
import styled from 'styled-components';

import useShoppingCart from '../../../../logic/application/ShoppingCart/useShoppingCart';

const AppliedDiscountsWrapper = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
  padding: 24px 0;
`;

const AppliedDiscountsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.tinted};
  letter-spacing: 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
`;

const AppliedDiscountsList = styled.ul`
  margin-top: 16px;
  display: grid;
  grid-template-rows: repeat(auto);
  grid-gap: 20px;
`;

const AppliedDiscountsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 14px;
  line-height: 17px;
`;

const AppliedDiscountsAmount = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const AppliedDiscounts: FC = () => {
  const { appliedDiscounts } = useShoppingCart();
  return (
    <AppliedDiscountsWrapper>
      <AppliedDiscountsTitle>Discounts</AppliedDiscountsTitle>
      <AppliedDiscountsList>
        {appliedDiscounts.map((appliedDiscount) => (
          <AppliedDiscountsItem key={appliedDiscount.name}>
            <span>
              {appliedDiscount.quantity > 1 && (
                <>
                  x
                  {appliedDiscount.quantity}
                  {' '}
                </>
              )}
              {appliedDiscount.name}
            </span>
            <AppliedDiscountsAmount>
              -
              {appliedDiscount.total}
              €
            </AppliedDiscountsAmount>
          </AppliedDiscountsItem>
        ))}
      </AppliedDiscountsList>
    </AppliedDiscountsWrapper>
  );
};

export default AppliedDiscounts;
