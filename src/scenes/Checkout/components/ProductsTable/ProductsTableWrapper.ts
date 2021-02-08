import styled, { css } from 'styled-components';

type Props = {
  $isHeader: boolean;
};

const ProductsTableWrapper = styled.ul<Props>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(auto);
  grid-gap: 32px;
  ${({ $isHeader }) => $isHeader
    && css`
      padding: 32px 0;
    `}
`;

ProductsTableWrapper.defaultProps = {
  $isHeader: false,
};

export default ProductsTableWrapper;
