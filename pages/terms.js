import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      <Head>
        <title>Terms — Nerestore</title>
        <meta name="description" content="Terms Nerestore" />
      </Head>

      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h1 className="text-3xl font-bold text-white">Terms</h1>
<p className="mt-4 text-gray-300">
  Dengan mengakses website ini, kamu setuju untuk menggunakan konten dan layanan secara wajar dan tidak melanggar hukum.
</p>
<h2 className="mt-8 text-xl font-semibold text-white">Penggunaan layanan</h2>
<ul className="mt-3 space-y-2 text-gray-300">
  <li>• Pastikan penggunaan produk/layanan sesuai ketentuan platform terkait.</li>
  <li>• Dilarang menggunakan website untuk aktivitas ilegal atau pelanggaran hak cipta.</li>
</ul>
<h2 className="mt-8 text-xl font-semibold text-white">Perubahan</h2>
<p className="mt-3 text-gray-300">
  Syarat ini bisa diperbarui sewaktu-waktu untuk menyesuaikan kebutuhan dan kebijakan.
</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
