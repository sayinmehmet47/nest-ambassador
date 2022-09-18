import Head from 'next/head';
import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script src="https://js.stripe.com/v3/"></Script>
      <main>{children}</main>
    </>
  );
}
