import {Fragment} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import HeaderNavigation from './Navigation';
import HeaderLogo from './Logo';
import HeaderLoginLink from './LoginLink';

const Container = styled.header`
  z-index: 1;

  box-sizing: border-box;

  position: sticky;
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 1.5em;

  font-size: 1rem;

  max-width: ${theme.breakpoints.desktop};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  @media screen and (min-width: ${theme.breakpoints.largeLaptop}) {
    padding-left: 3em;
    padding-right: 3em;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-left: 5em;
    padding-right: 5em;
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
