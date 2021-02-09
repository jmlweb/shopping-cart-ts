import { FC } from 'react';
import styled from 'styled-components';

import Title from '../../../../components/Title';
import ActionButton from '../../../../components/ActionButton';

const ProductDetailDataWrapper = styled.div`
  background: #fff;
  color: #212240;
  border-radius: 0 4px 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const ProductDetailTitle = styled(Title)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
`;

const ProductDetailDescription = styled.p`
  font-size: 12px;
  padding: 16px 0 48px;
  line-height: 16px;
  letter-spacing: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProductCode = styled.p`
  padding-top: 8px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.muted};
  padding-bottom: 32px;
`;

const ProductDetailData: FC = () => (
  <ProductDetailDataWrapper>
    <div>
      <ProductDetailTitle>
        <span>Shirt</span>
        <span>20€</span>
      </ProductDetailTitle>
      <ProductDetailDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales
        semper elit sit amet interdum. Praesent volutpat sed elit vel
        consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet
        varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.
      </ProductDetailDescription>
      <ProductCode>Product code: SHIRT</ProductCode>
      <ActionButton>Add to cart</ActionButton>
    </div>
  </ProductDetailDataWrapper>
);

export default ProductDetailData;
