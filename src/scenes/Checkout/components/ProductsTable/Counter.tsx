import { FC } from 'react';
import styled from 'styled-components';

import ProductTableCenteredCol from './ProductTableCenteredCol';

const CounterWrapper = styled(ProductTableCenteredCol)`
  display: flex;
  align-items: center;
`;

const CounterButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  line-height: 25px;
  padding: 0 8px;
`;

const CounterInput = styled.input`
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.fieldBorder};
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  line-height: 17px;
`;

type Props = {
  value: number,
  onScan: () => void,
  onReject: () => void,
};

const Counter: FC<Props> = ({ value, onScan, onReject }) => (
  <CounterWrapper>
    <CounterButton onClick={onScan}>+</CounterButton>
    <CounterInput value={value} readOnly />
    <CounterButton onClick={onReject}>-</CounterButton>
  </CounterWrapper>
);

export default Counter;
