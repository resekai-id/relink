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
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/Thin.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/ThinItalic.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/Regular.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/Medium.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/MediumItalic.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/XBold.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/XBoldItalic.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/Black.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/AktivGrotesk/BlackItalic.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/FaktPro/Normal.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/FaktPro/Medium.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/Light.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/LightItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/Regular.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/RegularItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/Medium.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/MediumItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/Bold.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/BoldItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/Super.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Display/SuperItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/Light.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/LightItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/Regular.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/RegularItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/Medium.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/MediumItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/Bold.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/BoldItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/Black.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/assets/fonts/GTSuper/Text/BlackItalic.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
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
