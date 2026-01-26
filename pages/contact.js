import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      <Head>
        <title>Contact — Nerestore</title>
        <meta name="description" content="Contact Nerestore" />
      </Head>

      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h1 className="text-3xl font-bold text-white">Contact</h1>
<p className="mt-4 text-gray-300">Butuh bantuan atau mau order? Hubungi kami lewat:</p>
<div className="mt-6 grid gap-3">
  <a className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white hover:bg-white/10 transition"
     href="https://wa.me/6289601570287" target="_blank" rel="noreferrer">
    WhatsApp — klik untuk chat
    <div className="text-xs text-gray-400 mt-1">ADMIN</div>
  </a>
  <a className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white hover:bg-white/10 transition"
     href="mailto:nerestore81@gmail.com">
    Email — nerestore81@gmail.com
  </a>
</div>
<p className="mt-6 text-xs text-gray-500">
  Jam respon: 09:00–22:00 WIB (estimasi).
</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
