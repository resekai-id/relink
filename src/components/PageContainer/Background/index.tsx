import styled from 'styled-components';

import BackgroundImage from './Image';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;

  z-index: -1;
  display: unset;

  background-color: var(--color-background-primary);
`;

const Background = () => (
  <BackgroundContainer>
    <BackgroundImage />
  </BackgroundContainer>
);

export default Background;
