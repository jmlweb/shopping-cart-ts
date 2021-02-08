import styled from 'styled-components';

const Container = styled.div`
  margin: 32px;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerMaxWidth};
`;

export default Container;
