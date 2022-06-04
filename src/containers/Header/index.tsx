import {Fragment} from 'react';
import styled from 'styled-components';

import HeaderNavigation from './Navigation';
import HeaderLogo from './Logo';
import HeaderLoginLink from './LoginLink';

const Wrapper = styled.header`
  box-sizing: border-box;

  position: fixed;
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const Padding = styled.div`
  width: 100vw;

  height: 104px;
`;

const Header = () => (
  <Fragment>
    <Wrapper>
      <HeaderNavigation />
      <HeaderLogo />
      <HeaderLoginLink />
    </Wrapper>
    <Padding />
  </Fragment>
);

export default Header;
