import { FC } from 'react';
import styled from 'styled-components';

const ProductInfoWrapper = styled.figure`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
`;

const ProductInfoImg = styled.img`
  margin-right: 16px;
  width: 72px;
  height: 72px;
  border: ${({ theme }) => theme.colors.darkBorder};
  border-radius: 4px;
`;

const ProductInfoTitle = styled.h1`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProductInfoCode = styled.p`
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.13px;
  font-size: 12px;
  line-height: 16px;
`;

type Props = {
  name: string;
  image: string;
  code: string;
};

const ProductInfo: FC<Props> = ({ name, image, code }) => (
  <ProductInfoWrapper>
    <ProductInfoImg src={image} alt={code} />
    <div>
      <ProductInfoTitle>{name}</ProductInfoTitle>
      <ProductInfoCode>
        Product code
        {' '}
        {code}
      </ProductInfoCode>
    </div>
  </ProductInfoWrapper>
);

export default ProductInfo;
