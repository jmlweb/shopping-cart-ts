import styled from 'styled-components';

/**
 * NOTE: This component uses the user agent font instead of the base one.
 * Solve with design team if it should be the same.
 */

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 14px;
  padding: 16px;
  width: 100%;
`;

ActionButton.defaultProps = {
  type: 'submit',
};

export default ActionButton;
