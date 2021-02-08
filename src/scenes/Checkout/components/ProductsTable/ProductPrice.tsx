import { FC } from 'react';
import styled from 'styled-components';

import ProductTableCenteredCol from './ProductTableCenteredCol';

const ProductPriceAmount = styled.span`
  color: #000;
  font-size: 16px;
`;

const ProductPriceCurrency = styled.span`
  margin-left: 4px;
`;

const ProductPrice: FC = ({ children }) => (
  <ProductTableCenteredCol>
    <ProductPriceAmount>{children}</ProductPriceAmount>
    <ProductPriceCurrency>€</ProductPriceCurrency>
  </ProductTableCenteredCol>
);

export default ProductPrice;
