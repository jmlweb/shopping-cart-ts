import { Children, FC, ReactNode } from 'react';
import styled from 'styled-components';

const DividedCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  position: relative;
  @media(min-width: 900px) {
    grid-template-columns: ${({ theme }) => `1fr ${theme.sizes.column}`};
    min-height: 648px;
  }
`;

type Props = {
  mainContent: ReactNode,
  auxContent: ReactNode,
};

/**
 * The reason why we are using "Children.only" here is to ensure we only pass
 * 1 item for "mainContent" and 1 for "auxContent" and we don't break the layout
 */

const DividedCard: FC<Props> = ({ mainContent, auxContent }) => (
  <DividedCardWrapper>
    {Children.only(mainContent)}
    {Children.only(auxContent)}
  </DividedCardWrapper>
);

export default DividedCard;
