import { FC } from 'react';
import styled from 'styled-components';

const ProductImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 4px 0 0 4px;
`;

const ProductImageBg = styled.img`
  object-fit: cover;
  display: block;
  max-width: 100%;
  height: 100%;
`;

/**
 * TODO: Replace with the proper image path once provided
 */
const ProductImage: FC = () => (
  <ProductImageWrapper>
    <ProductImageBg src="/img/product-img-big.jpg" />
  </ProductImageWrapper>
);

export default ProductImage;
