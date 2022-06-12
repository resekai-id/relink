import {Fragment, FC, PropsWithChildren} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import PageBackground from './Background';

const Container = styled.div`
  z-index: 0;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  padding: 6.5em 1.5em;

  max-width: ${theme.breakpoints.desktop};

  @media screen and (min-width: ${theme.breakpoints.largeLaptop}) {
    padding-left: 3em;
    padding-right: 3em;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-left: 5em;
    padding-right: 5em;
  }
`;

const PageContainer: FC<PropsWithChildren<Record<string, unknown>>> = ({children}) => (
  <Fragment>
    <Container>{children}</Container>
    <PageBackground />
  </Fragment>
);

export default PageContainer;
