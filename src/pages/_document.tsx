import {Fragment, ReactFragment} from 'react';
import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

import FontProvider from '../components/FontProvider';

class Document extends NextDocument {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    const {renderPage} = context;
    const styleSheet = new ServerStyleSheet();

    try {
      context.renderPage = () =>
        renderPage({enhanceApp: App => props => styleSheet.collectStyles(<App {...props} />)});

      const initialProps = await NextDocument.getInitialProps(context);

      return {
        ...initialProps,
        styles: (
          <Fragment>
            {initialProps.styles}
            {styleSheet.getStyleElement()}
          </Fragment>
        ) as unknown as ReactFragment,
      };
    } finally {
      styleSheet.seal();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html>
        <Head>
          <FontProvider />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
