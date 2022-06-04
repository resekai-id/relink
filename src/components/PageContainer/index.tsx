import {Fragment, FC, PropsWithChildren} from 'react';
import styled from 'styled-components';

import theme from '../../constants/client/theme';

import Background from './Background';

const Container = styled.div`
  z-index: 1;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  padding: 104px 24px;

  @media screen and (min-width: ${theme.breakpoints.laptop}) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const PageContainer: FC<PropsWithChildren<Record<string, unknown>>> = ({children}) => (
  <Fragment>
    <Container>{children}</Container>
    <Background />
  </Fragment>
);

export default PageContainer;
