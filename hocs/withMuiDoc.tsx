import { ServerStyleSheets } from '@material-ui/styles';
import React, { Component } from 'react';
import flush from 'styled-jsx/server';

function withMuiDoc(Document) {
  return class DocumentWithMui extends Component {
    public static async getInitialProps(ctx) {
      const sheets = new ServerStyleSheets();
      const originalRenderPage = ctx.renderPage;

      ctx.renderPage = () => {
        return originalRenderPage({
          enhanceApp: App => props => sheets.collect(<App {...props} />),
        });
      };

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {sheets.getStyleElement()}
            {flush() || null}
          </>
        ),
      };
    }

    public render() {
      return <Document {...this.props} />;
    }
  };
}

export default withMuiDoc;