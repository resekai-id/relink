import 'normalize.css';

import '../assets/styles/fonts.css';

import {Fragment} from 'react';
import {NextComponentType, NextPageContext} from 'next';
import NextApp, {AppContext} from 'next/app';

import store from '../store';

import ThemeProvider from '../components/ThemeProvider';
import PageHeader from '../containers/PageHeader';
import PageContainer from '../components/PageContainer';

class App extends NextApp {
  public static async getInitialProps({Component, ctx}: AppContext) {
    return {pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}};
  }

  public static getStaticProps() {
    return {
      props: {},
      // Unsplash API limit is 50 requests per hour.
      revalidate: 72,
    };
  }

  public render() {
    const {Component, pageProps} = this.props as {
      Component: NextComponentType<NextPageContext<never>, never, Record<string, unknown>>;
      pageProps: Record<string, unknown>;
    };

    return (
      <Fragment>
        <ThemeProvider />
        <PageHeader />
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      </Fragment>
    );
  }
}

export default store.withRedux(App);
