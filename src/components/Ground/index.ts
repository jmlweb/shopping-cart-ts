import styled from 'styled-components';

// NOTE: This file should be optimized & converted to a JPG
import backgroundImg from './background.png';

/**
 * NOTE: This component uses the user agent font instead of the base one.
 * Solve with design team if it should be the same.
 */

const Ground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #212240 ${`url(${backgroundImg})`} center center no-repeat;
  background-size: cover;
  height: 100vh;
  overflow-y: auto;
`;

export default Ground;
