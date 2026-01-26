import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Nerestore</title>
        <meta name="description" content="Privacy Policy Nerestore" />
      </Head>

      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
<p className="mt-4 text-gray-300">
  Kami menghargai privasi kamu. Website ini dapat menggunakan cookies untuk pengalaman yang lebih baik.
  Jika di masa depan kamu memasang iklan (mis. Google AdSense), pihak ketiga bisa menayangkan iklan dan menggunakan cookies
  untuk menayangkan iklan yang relevan.
</p>
<h2 className="mt-8 text-xl font-semibold text-white">Data yang mungkin dikumpulkan</h2>
<ul className="mt-3 space-y-2 text-gray-300">
  <li>• Data teknis standar (browser, perangkat, halaman yang dikunjungi)</li>
  <li>• Cookies untuk analitik/performa (jika diaktifkan)</li>
</ul>
<h2 className="mt-8 text-xl font-semibold text-white">Kontak</h2>
<p className="mt-3 text-gray-300">
  Jika ada pertanyaan soal privasi, kamu bisa hubungi kami via halaman Contact.
</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
