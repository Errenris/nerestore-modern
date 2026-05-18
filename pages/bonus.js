import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Bonus() {
  const bonusLink = "https://pastelink.net/q1ycgxfd";
  const [showDonationPopup, setShowDonationPopup] = useState(true);

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

      {showDonationPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/95 p-5 shadow-2xl">
            <h2 className="text-xl font-bold">Dukung Nerestore 💙</h2>
            <p className="mt-2 text-sm text-gray-300">
              Donasi seikhlasnya via QRIS ya. Terima kasih sudah support 🙏
            </p>

            <img
              src="/qris.jpg"
              alt="QRIS Donasi"
              className="mt-4 w-full rounded-xl border border-white/10"
            />

            <button
              onClick={() => setShowDonationPopup(false)}
              className="mt-4 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Oke min
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
