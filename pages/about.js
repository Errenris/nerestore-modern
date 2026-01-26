import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      <Head>
        <title>About — Nerestore</title>
        <meta name="description" content="About Nerestore" />
      </Head>

      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h1 className="text-3xl font-bold text-white">About</h1>
<p className="mt-4 text-gray-300">
  Nerestore adalah brand digital yang fokus ke <span className="text-white font-semibold">template</span>,
  <span className="text-white font-semibold"> tools</span>, dan <span className="text-white font-semibold">layanan kreator</span>.
  Tujuan kami: bikin proses desain & jualan online jadi lebih cepat, rapi, dan profesional.
</p>
<ul className="mt-6 space-y-2 text-gray-300">
  <li>• Konten blog berisi tutorial & resource legal</li>
  <li>• Layanan digital & template untuk kebutuhan promosi</li>
  <li>• Support via WhatsApp untuk bantuan cepat</li>
</ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
