import { FC } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Product from '../../../../logic/domain/Product';
import Title from '../../../../components/Title';
import ActionButton from '../../../../components/ActionButton';
import useShoppingCart from '../../../../logic/application/ShoppingCart/useShoppingCart';

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

type Props = {
  product: Product;
};

const ProductDetailData: FC<Props> = ({ product }) => {
  const history = useHistory();
  const { scan } = useShoppingCart();
  const handleClick = () => {
    scan(product.code);
    history.push('/');
  };
  return (
    <ProductDetailDataWrapper>
      <div>
        <ProductDetailTitle>
          <span>{product.name}</span>
          <span>
            {product.price.formattedValue}
            €
          </span>
        </ProductDetailTitle>
        <ProductDetailDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales
          semper elit sit amet interdum. Praesent volutpat sed elit vel
          consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet
          varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.
        </ProductDetailDescription>
        <ProductCode>
          Product code:
          {' '}
          {product.code}
        </ProductCode>
        <ActionButton onClick={handleClick}>Add to cart</ActionButton>
      </div>
    </ProductDetailDataWrapper>
  );
};

export default ProductDetailData;
