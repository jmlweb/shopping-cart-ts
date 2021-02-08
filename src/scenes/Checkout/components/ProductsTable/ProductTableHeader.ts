import styled from 'styled-components';

type Props = {
  $align?: 'left' | 'center' | 'right'
};

const ProductTableHeader = styled.div<Props>`
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;
  line-height: 16px;
  text-align: ${({ $align }) => $align};
`;

export default ProductTableHeader;
