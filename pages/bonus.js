import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Bonus() {
  const bonusLink = "https://pastelink.net/q1ycgxfd";

  return (
    <>
      <Head>
        <title>Bonus | Nerestore</title>

        {/* penting: jangan diindex mesin pencari */}
        <meta name="robots" content="noindex,nofollow" />

        {/* opsional: lebih tegas */}
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-14 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold">Bonus Resource Gratis</h1>
          <p className="mt-3 text-gray-300">
            Halaman ini khusus bonus untuk pengunjung. Untuk keamanan dan kepatuhan,
            halaman ini tidak ditampilkan untuk mesin pencari.
          </p>

          <div className="mt-6 rounded-xl bg-black/30 border border-white/10 p-5">
            <p className="text-sm text-gray-300">
              🔗 Akses bonus di sini:
            </p>

            <a
              href={bonusLink}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-base font-semibold underline decoration-white/20 hover:decoration-white/60"
            >
              Buka Bonus Resource
              <span aria-hidden>↗</span>
            </a>

            <p className="mt-4 text-xs text-gray-400">
              Catatan: Pastikan penggunaan resource sesuai aturan platform/sumbernya.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}