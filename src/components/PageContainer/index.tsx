import {Fragment, FC, PropsWithChildren} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import PageBackground from './Background';

const Container = styled.div`
  z-index: 0;

  box-sizing: border-box;

  position: relative;

  padding: 6em 1.5em;
  padding-bottom: 3em;

  max-width: min(100%, ${theme.breakpoints.desktop});
  width: 100%;
  height: 100%;

  flex: none;
  order: 1;
  flex-grow: 1;
  align-self: center;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

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
