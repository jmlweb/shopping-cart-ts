import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import closeImg from './close.svg';

const ProductDetailCloseLink = styled(Link)`
  position: absolute;
  top: 32px;
  right: 32px;
`;

const ProductDetailClose: FC = () => (
  <ProductDetailCloseLink to="/">
    <img src={closeImg} alt="" />
  </ProductDetailCloseLink>
);

export default ProductDetailClose;
