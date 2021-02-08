import styled from 'styled-components';

import Title from '../../../../components/Title';

const SectionTitle = styled(Title)`
  padding-bottom: 16px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
`;

export default SectionTitle;
