import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProductInfoWrapper = styled.figure`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
`;

const ProductInfoImg = styled.img`
  margin-right: 16px;
  width: 72px;
  height: 72px;
  border: 1px solid ${({ theme }) => theme.colors.darkBorder};
  border-radius: 4px;
`;

const ProductInfoTitle = styled.h1`
  font-size: 16px;
  line-height: 24px;
`;

const ProductInfoLink = styled(Link)`
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
    <Link to={`/product/${code}`}><ProductInfoImg src={image} alt={code} /></Link>
    <div>
      <ProductInfoTitle>
        <ProductInfoLink to={`/product/${code}`}>
          {name}
        </ProductInfoLink>
      </ProductInfoTitle>
      <ProductInfoCode>
        Product code
        {' '}
        {code}
      </ProductInfoCode>
    </div>
  </ProductInfoWrapper>
);

export default ProductInfo;
