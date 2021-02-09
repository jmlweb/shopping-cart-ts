import { FC } from 'react';

import useShoppingCart from '../../../../logic/application/ShoppingCart/useShoppingCart';
import ProductsTableWrapper from './ProductsTableWrapper';
import ProductTableRow from './ProductTableRow';
import ProductTableHeader from './ProductTableHeader';
import ProductInfo from './ProductInfo';
import ProductTableCenteredCol from './ProductTableCenteredCol';
import ProductPrice from './ProductPrice';
import Counter from './Counter';

/**
 * We wrap our component inside "memo" to avoid re-renders when
 * updating the cart items
 */
const ProductsTableTop: FC = () => (
  <ProductsTableWrapper $isHeader>
    <ProductTableRow>
      <ProductTableHeader $align="left">Product details</ProductTableHeader>
      <ProductTableHeader $align="center">Quantity</ProductTableHeader>
      <ProductTableHeader $align="center">Price</ProductTableHeader>
      <ProductTableHeader $align="center">Total</ProductTableHeader>
    </ProductTableRow>
  </ProductsTableWrapper>
);

/**
 * NOTE: In an ideal world, the image would be included inside the product info
 * In fact, there shoud be an "StandardProduct" extending from "Product" with that property
 */
const ProductsTableContent: FC = () => {
  const { items, reject, scan } = useShoppingCart();
  return (
    <ProductsTableWrapper $isHeader={false}>
      {items.map((item) => (
        <ProductTableRow key={item.product.code} data-testid="checkoutProductRow">
          <ProductInfo name={item.product.name} code={item.product.code} image={`/img/${item.product.code.toLowerCase()}.png`} />
          <ProductTableCenteredCol>
            <Counter
              value={item.quantity}
              onScan={() => scan(item.product.code)}
              onReject={() => reject(item.product.code)}
            />
          </ProductTableCenteredCol>
          <ProductPrice>{item.product.price}</ProductPrice>
          <ProductPrice>{item.total}</ProductPrice>
        </ProductTableRow>
      ))}
    </ProductsTableWrapper>
  );
};

const ProductsTable: FC = () => (
  <>
    <ProductsTableTop />
    <ProductsTableContent />
  </>
);

export default ProductsTable;
