import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import useAPI from '../../logic/application/API/useAPI';
import Product from '../../logic/domain/Product';
import Ground from '../../components/Ground';
import Container from '../../components/Container';
import DividedCard from '../../components/DividedCard';
import ProductDetailOverlay from './components/ProductDetailOverlay';
import ProductImage from './components/ProductImage';
import ProductDetailData from './components/ProductDetailData';
import ProductDetailClose from './components/ProductDetailClose';

type Props = {
  product: Product
};

const ProductDetailView: FC<Props> = ({ product }) => (
  <Ground>
    <ProductDetailOverlay />
    <Container>
      <DividedCard
        mainContent={<ProductImage />}
        auxContent={(
          <>
            <ProductDetailData product={product} />
            <ProductDetailClose />
          </>
  )}
      />
    </Container>
  </Ground>
);

type Params = {
  code: string
};

const ProductDetail: FC = () => {
  const { code } = useParams<Params>();
  const api = useAPI();
  const { data, error, isLoading } = useQuery(['productDetail', code], () => api.product.get(code));
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>There was an error</div>;
  }
  return <ProductDetailView product={data} />;
};

export default ProductDetail;
