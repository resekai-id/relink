import 'normalize.css';
import '../../public/assets/styles/fonts.css';

import {NextComponentType, NextPageContext} from 'next';
import NextApp, {AppContext} from 'next/app';
import styled, {ThemeProvider} from 'styled-components';

import store from '../store';

import theme, {ThemeProps} from '../static/client/theme';

import Header from '../containers/Header';

const PageBackground = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${({theme: pageTheme}: ThemeProps) => pageTheme.colors.background.primary};
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
      <ThemeProvider theme={theme}>
        <PageBackground>
          <Header />
          <Component {...pageProps} />
        </PageBackground>
      </ThemeProvider>
    );
  }
}

export default store.withRedux(App);
