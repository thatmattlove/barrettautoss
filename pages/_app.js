import * as React from 'react';
import Head from 'next/head';
import { Layout } from '../components';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Barrett Automotive Speed Shop</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@200;400;600;800&display=swap"
        rel="stylesheet"
      />
      <meta httpEquiv="Content-Type" content="text/html" />
      <meta charSet="UTF-8" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default App;
