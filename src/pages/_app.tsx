import 'normalize.css';
import '../../public/assets/styles/fonts.css';

import {Fragment} from 'react';
import {NextComponentType, NextPageContext} from 'next';
import NextApp, {AppContext} from 'next/app';

import store from '../store';

import ThemeProvider from '../containers/ThemeProvider';
import Header from '../containers/Header';
import PageWrapper from '../containers/PageWrapper';

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
      <Fragment>
        <PageWrapper>
          <ThemeProvider />
          <Header />
          <Component {...pageProps} />
        </PageWrapper>
      </Fragment>
    );
  }
}

export default store.withRedux(App);
