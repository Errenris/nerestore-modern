import Head from 'next/head'
import { useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import CartModal from '../components/CartModal'
import productsRaw from '../data/products.json'

function formatIDR(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return new Intl.NumberFormat('id-ID').format(num)
}

export default function Home() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState({ open: false, message: '' })

  const products = useMemo(() => {
    return productsRaw.map((p) => ({
      ...p,
      displayTitle: p.title
        .replace(/CANVA/gi, 'Canva')
        .replace(/PRO/gi, 'Premium')
        .replace(/DESIGNER/gi, 'Designer')
    }))
  }, [])

  const showToast = (message) => {
    setToast({ open: true, message })
    setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 2200)
  }

  const addToCart = (p) => {
    setCart((prev) => [...prev, p])
    showToast(`${p.displayTitle || p.title} ditambahkan`)
  }

  const total = cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0)

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-cyan-500/30">
      <Head>
        <title>Nerestore — Digital Store & Bot Services</title>
        <meta
          name="description"
          content="Nerestore: template, tools, dan layanan digital. Baca blog untuk tutorial & resource legal."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background Blur Gelap Ala Luar Angkasa */}
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-600 blur-[128px]" />
          <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-blue-700 blur-[128px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                VPS Node.js Server : ONLINE
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                Layanan Digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg">Super Premium</span>.
              </h1>

              <p className="mt-5 text-gray-300 leading-relaxed text-lg">
                Automasi Bot WhatsApp 24/7, akun premium, dan boost sosial media. Proses cepat, aman, dan bergaransi.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform"
                >
                  Lihat Produk
                </button>
                <a
                  href="https://wa.me/6289601570287"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Konsultasi WA
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-gray-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-400 font-bold text-sm">⚡ Cepat</div>
                  <div className="mt-1">Server VPS ngebut</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-400 font-bold text-sm">🛡️ Aman</div>
                  <div className="mt-1">Anti-delay & legal</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-400 font-bold text-sm">💬 Support</div>
                  <div className="mt-1">Bantuan 24/7</div>
                </div>
              </div>
            </div>

            {/* CARD KERANJANG (Glassmorphism) */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-lg">Keranjang Belanja</div>
                  <div className="text-sm text-cyan-400">{cart.length} item siap bayar</div>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-xl border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                >
                  Buka
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {cart.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/20 p-6 text-center text-sm text-gray-400 bg-black/20">
                    Keranjang masih kosong.<br/>Yuk pilih layanan di bawah!
                  </div>
                ) : (
                  cart.slice(-3).reverse().map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4 hover:border-cyan-500/30 transition-colors">
                      <div className="text-sm">
                        <div className="text-white font-semibold">{p.displayTitle || p.title}</div>
                        <div className="text-cyan-400 mt-0.5">Rp {formatIDR(p.price)}</div>
                      </div>
                      <div className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md">x1</div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-cyan-900/20 p-4 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">
                <div className="text-sm text-cyan-100">Total Harga</div>
                <div className="text-cyan-400 font-bold text-lg">Rp {formatIDR(total)}</div>
              </div>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Garansi layanan aktif sesuai masa pembelian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="produk" className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Etalase Produk</h2>
            <p className="mt-2 text-cyan-400/80">Pilih paket layanan yang kamu butuhkan hari ini.</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-3 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform md:mt-0 md:w-auto"
          >
            Lihat Keranjang ({cart.length})
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-1 hover:border-cyan-500/50 transition-colors shadow-lg">
              <ProductCard product={p} onAdd={() => addToCart(p)} />
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-900/20 to-black/40 p-6 md:p-8 backdrop-blur-lg">
          <h3 className="text-xl font-bold text-white">Butuh layanan custom?</h3>
          <p className="mt-2 text-gray-300">
            Konsultasikan kebutuhan pembuatan Bot WA atau request fitur khusus langsung dengan admin Nerestore.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://wa.me/6289601570287"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TOAST */}
      {toast.open && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-cyan-500/50 bg-black/90 px-6 py-3 text-sm font-semibold text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] backdrop-blur">
          {toast.message}
        </div>
      )}

      <CartModal open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

      <Footer />
    </div>
  )
}
