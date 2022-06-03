import {Fragment} from 'react';
import styled from 'styled-components';

import {ThemeProps} from '../static/client/theme';

import RelinkLogoIcon from '../components/RelinkLogoIcon';

const Logo = styled(RelinkLogoIcon)`
  fill: ${({theme: pageTheme}: ThemeProps) => pageTheme.colors.text.primary};
`;

const Container = styled.div`
  box-sizing: border-box;

  position: fixed;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;

  width: 100vw;
`;

const Padding = styled.div`
  width: 100vw;

  height: 104px;
`;

const Header = () => (
  <Fragment>
    <Container>
      <a href="">
        <Logo />
      </a>
    </Container>
    <Padding />
  </Fragment>
);

export default Header;
