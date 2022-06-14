import {Fragment, FC, PropsWithChildren} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import PageBackground from './Background';

const Container = styled.div`
  z-index: 0;

  box-sizing: border-box;

  padding: 3em 1.5em;

  max-width: min(100%, ${theme.breakpoints.desktop});

  flex: none;
  order: 1;
  flex-grow: 1;
  align-self: stretch;

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
