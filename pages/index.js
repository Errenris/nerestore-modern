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

const highlights = [
  { label: 'Order selesai', value: '2K+', icon: '✦' },
  { label: 'Support admin', value: '24/7', icon: '◌' },
  { label: 'Garansi layanan', value: '100%', icon: '◆' }
]

const benefits = [
  { title: 'Proses Kilat', body: 'Order diproses rapi dengan alur checkout yang simpel dan jelas.', icon: '⚡' },
  { title: 'Aman & Bergaransi', body: 'Setiap layanan punya catatan penggunaan dan support setelah pembelian.', icon: '🛡️' },
  { title: 'Support Responsif', body: 'Admin siap bantu konsultasi, request custom, dan konfirmasi pembayaran.', icon: '💬' }
]

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
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-cyan-300/30">
      <Head>
        <title>Nerestore — Digital Store & Bot Services</title>
        <meta
          name="description"
          content="Nerestore: template, tools, dan layanan digital. Baca blog untuk tutorial & resource legal."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(167,139,250,0.24),transparent_28%),linear-gradient(135deg,#020617_0%,#08111f_48%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      </div>

      <Header />

      <main>
        <section className="relative px-4 pb-12 pt-16 md:px-6 md:pb-20 md:pt-24">
          <div className="absolute left-1/2 top-16 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px]" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
                Admin Online • Fast Response
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                Digital Store dengan sentuhan{' '}
                <span className="liquid-text">Liquid Glass</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Automasi Bot WhatsApp 24/7, akun premium, boost sosial media, dan layanan custom dalam tampilan modern yang elegan, cepat, aman, serta mudah dipesan.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 px-7 py-4 text-sm font-black text-slate-950 shadow-[0_22px_70px_rgba(56,189,248,0.28)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(56,189,248,0.38)]"
                >
                  Jelajahi Produk
                </button>
                <a
                  href="https://wa.me/6289601570287"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/10 px-7 py-4 text-center text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/15"
                >
                  Konsultasi WhatsApp
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label} className="liquid-panel rounded-[1.5rem] p-4">
                    <div className="text-sm text-cyan-100/70">{item.icon} {item.label}</div>
                    <div className="mt-1 text-2xl font-black text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="liquid-panel relative rounded-[2.5rem] p-5 md:p-7">
              <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-sky-300/20 blur-3xl" />
              <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/35 p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-100/60">Live Cart</div>
                    <div className="mt-1 text-2xl font-black text-white">Keranjang Belanja</div>
                  </div>
                  <button
                    onClick={() => setOpen(true)}
                    className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/20"
                  >
                    Buka
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-[1.5rem] border border-dashed border-white/20 bg-white/[0.04] p-6 text-center text-sm leading-6 text-slate-300">
                      Keranjang masih kosong.<br />Pilih layanan favorit kamu di bawah.
                    </div>
                  ) : (
                    cart.slice(-3).reverse().map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                        <div className="text-sm">
                          <div className="font-bold text-white">{p.displayTitle || p.title}</div>
                          <div className="mt-0.5 text-cyan-200">Rp {formatIDR(p.price)}</div>
                        </div>
                        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70">x1</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 rounded-[1.6rem] border border-cyan-200/20 bg-cyan-300/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-cyan-50/75">Total Harga</div>
                    <div className="text-2xl font-black text-white">Rp {formatIDR(total)}</div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-cyan-50/55">Checkout diarahkan ke WhatsApp agar konfirmasi pembayaran lebih cepat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((item) => (
              <div key={item.title} className="liquid-card rounded-[2rem] p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 text-xl shadow-inner">{item.icon}</div>
                <h2 className="mt-5 text-xl font-black text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300/80">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="produk" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200/65">Premium Catalog</div>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">Etalase Produk</h2>
              <p className="mt-3 max-w-2xl text-slate-300">Pilih paket layanan yang kamu butuhkan hari ini. Semua kartu dibuat lebih bersih, modern, dan premium.</p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/15 md:w-auto"
            >
              Lihat Keranjang ({cart.length})
            </button>
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
            ))}
          </div>

          <div className="liquid-panel relative mt-14 overflow-hidden rounded-[2.5rem] p-7 md:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-100/60">Custom Service</div>
                <h3 className="mt-2 text-3xl font-black text-white">Butuh layanan custom?</h3>
                <p className="mt-2 max-w-2xl text-slate-300">Diskusikan kebutuhan bot, akun premium, desain, atau request khusus langsung dengan admin Nerestore.</p>
              </div>
              <a
                href="https://wa.me/6289601570287"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-emerald-300 px-7 py-4 text-center text-sm font-black text-emerald-950 shadow-[0_22px_60px_rgba(52,211,153,0.24)] transition hover:-translate-y-1"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {toast.open && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-cyan-200/25 bg-slate-950/80 px-6 py-3 text-sm font-black text-cyan-100 shadow-[0_20px_70px_rgba(34,211,238,0.24)] backdrop-blur-2xl">
          {toast.message}
        </div>
      )}

      <CartModal open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

      <Footer />
    </div>
  )
}
