import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Google AdSense Verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3215724068998032"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
