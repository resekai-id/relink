import {Fragment} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import HeaderNavigation from './Navigation';
import HeaderLogo from './Logo';
import HeaderLoginLink from './LoginLink';

const Container = styled.header`
  box-sizing: border-box;

  position: fixed;
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;

  @media screen and (min-width: ${theme.breakpoints.laptop}) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const PageHeader = () => (
  <Fragment>
    <Container>
      <HeaderNavigation />
      <HeaderLogo />
      <HeaderLoginLink />
    </Container>
  </Fragment>
);

export default PageHeader;
