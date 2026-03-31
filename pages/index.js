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
    // soft re-label for more “brand” wording (data as-is tetap dipakai)
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
    <>
      <Head>
        <title>Nerestore — Digital Store & Blog</title>
        <meta
          name="description"
          content="Nerestore: template, tools, dan layanan digital. Baca blog untuk tutorial & resource legal."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500 blur-3xl" />
          <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready • Fast delivery
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Bikin desain kamu kelihatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-amber-200">lebih premium</span>.
              </h1>

              <p className="mt-4 text-gray-300 leading-relaxed">
                Template, tools, dan layanan digital untuk kreator & seller. Kamu juga bisa baca blog untuk tutorial,
                checklist website, dan resource legal.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
                >
                  Lihat Produk
                </button>
                <a
                  href="/blog"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Baca Blog
                </a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-gray-400">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="text-white font-semibold">Cepat</div>
                  <div className="mt-1">Respon cepat</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="text-white font-semibold">Rapi</div>
                  <div className="mt-1">UI modern</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="text-white font-semibold">Support</div>
                  <div className="mt-1">Bantu setup</div>
                </div>
              </div>
            </div>

            {/* CARD */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Keranjang</div>
                  <div className="text-sm text-gray-400">{cart.length} item</div>
                </div>
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Buka
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {cart.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/20 p-5 text-sm text-gray-400">
                    Belum ada item. Tambahkan produk di bawah.
                  </div>
                ) : (
                  cart.slice(-3).reverse().map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-sm">
                        <div className="text-white font-semibold">{p.displayTitle || p.title}</div>
                        <div className="text-gray-400">Rp {formatIDR(p.price)}</div>
                      </div>
                      <div className="text-xs text-gray-400">x1</div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-white font-bold">Rp {formatIDR(total)}</div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Catatan: gunakan produk/layanan sesuai ketentuan platform terkait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="produk" className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Produk</h2>
            <p className="mt-1 text-gray-400">Pilih paket yang kamu butuhin. Klik untuk masuk keranjang.</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-3 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition md:mt-0 md:w-auto"
          >
            Lihat Keranjang ({cart.length})
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h3 className="text-lg font-bold text-white">Butuh bantuan?</h3>
          <p className="mt-2 text-gray-300">
            Kalau ada hal lain yang ingin ditanyakan, silakan lanjutkan chat dengan langsung to the point. 😏
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://wa.me/6289601570287"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              Chat WhatsApp
            </a>
            <a
              href="/blog"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Lihat Tutorial
            </a>
          </div>
        </div>
      </section>

      {/* TOAST */}
      {toast.open && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white shadow-xl backdrop-blur">
          {toast.message}
        </div>
      )}

      <CartModal open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

      <Footer />
    </>
  )
}
