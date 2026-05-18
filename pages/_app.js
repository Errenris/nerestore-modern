import '../styles/globals.css'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <Script
        src="https://pl29487742.effectivecpmnetwork.com/90/10/fe/9010fe6ef6eb78b9469467dbbf2273a0.js"
        strategy="afterInteractive"
      />
    </>
  )
}
