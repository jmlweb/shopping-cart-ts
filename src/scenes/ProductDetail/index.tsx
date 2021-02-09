import { FC } from 'react';

import Ground from '../../components/Ground';
import Container from '../../components/Container';
import DividedCard from '../../components/DividedCard';
import ProductDetailOverlay from './components/ProductDetailOverlay';
import ProductImage from './components/ProductImage';
import ProductDetailData from './components/ProductDetailData';
import ProductDetailClose from './components/ProductDetailClose';

const ProductDetail: FC = () => (
  <Ground>
    <ProductDetailOverlay />
    <Container>
      <DividedCard
        mainContent={<ProductImage />}
        auxContent={(
          <>
            <ProductDetailData />
            <ProductDetailClose />
          </>
)}
      />
    </Container>
  </Ground>
);

export default ProductDetail;
