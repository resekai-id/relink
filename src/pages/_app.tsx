import 'normalize.css';
import 'react-loading-skeleton/dist/skeleton.css';

import '../assets/styles/fonts.css';

import {useState, ComponentProps} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
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
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;

  min-height: 100vh;
`;
class App extends NextApp {
  state = {
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          retryDelay: attemptCount =>
            Math.min(2 ** (attemptCount - 1) * 1000, Number.POSITIVE_INFINITY) +
            Math.random() * 100,
        },
      },
    }),
  };

  public static async getInitialProps({Component, ctx}: AppContext) {
    return {pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}};
  }

  public render() {
    const {Component, pageProps} = this.props as {
      Component: NextComponentType<NextPageContext<never>, never, Record<string, unknown>>;
      pageProps: Record<string, unknown>;
    };

    return (
      <QueryClientProvider client={this.state.queryClient}>
        <Container>
          <ThemeProvider />
          <PageHeader />
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
          <PageFooter />
        </Container>
      </QueryClientProvider>
    );
  }
}

export default store.withRedux(App);
