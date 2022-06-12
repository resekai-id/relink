import 'normalize.css';
import 'react-loading-skeleton/dist/skeleton.css';

import '../assets/styles/fonts.css';

import styled from 'styled-components';
import {NextComponentType, NextPageContext} from 'next';
import NextApp, {AppContext} from 'next/app';

import store from '../store';

import ThemeProvider from '../components/ThemeProvider';
import PageHeader from '../containers/PageHeader';
import PageContainer from '../components/PageContainer';
import PageFooter from '../components/PageFooter';

const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

class App extends NextApp {
  public static async getInitialProps({Component, ctx}: AppContext) {
    return {pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}};
  }

  public render() {
    const {Component, pageProps} = this.props as {
      Component: NextComponentType<NextPageContext<never>, never, Record<string, unknown>>;
      pageProps: Record<string, unknown>;
    };

    return (
      <Container>
        <ThemeProvider />
        <PageHeader />
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
        <PageFooter />
      </Container>
    );
  }
}

export default store.withRedux(App);
