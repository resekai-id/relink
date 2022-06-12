import styled from 'styled-components';

import PageBackgroundImage from './Image';

const Container = styled.div`
  position: fixed;
  top: 0;

  width: 100vw;
  height: 100vh;

  z-index: -1;
  display: unset;

  background-color: var(--color-background-primary);
`;

const PageBackground = () => (
  <Container>
    <PageBackgroundImage />
  </Container>
);

export default PageBackground;
