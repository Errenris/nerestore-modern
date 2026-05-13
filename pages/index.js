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
    showToast(`${p.displayTitle || p.title} ditambahkan ke keranjang`)
  }

  const total = cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0)

  const stats = [
    { value: '24/7', label: 'Admin online', detail: 'Support responsif' },
    { value: '5m', label: 'Proses cepat', detail: 'Order langsung ditangani' },
    { value: '100%', label: 'Aman', detail: 'Bergaransi sesuai ketentuan' }
  ]

  const features = [
    { icon: '⚡', title: 'Instant Delivery', text: 'Alur pemesanan dibuat singkat supaya checkout lebih cepat.' },
    { icon: '🛡️', title: 'Transaksi Aman', text: 'Detail order terkirim rapi ke WhatsApp admin untuk verifikasi.' },
    { icon: '✨', title: 'Tampilan Premium', text: 'Katalog bersih, modern, dan nyaman dipakai di semua layar.' }
  ]

  return (
    <div className="min-h-screen overflow-hidden text-white selection:bg-cyan-300/30">
      <Head>
        <title>Nerestore — Digital Store & Bot Services</title>
        <meta
          name="description"
          content="Nerestore: template, tools, dan layanan digital dengan tampilan modern liquid glass."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />
            <div className="absolute right-0 top-28 h-[26rem] w-[26rem] rounded-full bg-violet-500/20 blur-[150px]" />
            <div className="absolute bottom-0 left-0 h-[22rem] w-[22rem] rounded-full bg-emerald-400/10 blur-[120px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-200/20 bg-cyan-100/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 shadow-[0_18px_60px_rgba(34,211,238,0.14)] backdrop-blur-xl">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  Admin Online
                </div>

                <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.05em] text-white md:text-7xl">
                  Layanan digital dengan nuansa{' '}
                  <span className="bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text text-transparent">
                    liquid glass
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                  Automasi Bot WhatsApp, akun premium, dan kebutuhan digital lain dalam katalog yang lebih profesional, cepat, dan elegan.
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
                    className="gradient-button"
                  >
                    Jelajahi Produk
                  </button>
                  <a
                    href="https://wa.me/6289601570287"
                    target="_blank"
                    rel="noreferrer"
                    className="glass-button"
                  >
                    Konsultasi WhatsApp
                  </a>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div key={item.label} className="liquid-glass rounded-3xl p-4">
                      <div className="text-2xl font-black text-white">{item.value}</div>
                      <div className="mt-1 text-sm font-bold text-cyan-100">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-400">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg lg:mr-0">
                <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-300/25 via-violet-400/20 to-emerald-300/10 blur-3xl" />
                <div className="liquid-glass relative rounded-[2.5rem] p-4 md:p-6" style={{ animation: 'float-soft 7s ease-in-out infinite' }}>
                  <div className="absolute -right-6 top-10 h-24 w-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-2xl" />
                  <div className="absolute -left-5 bottom-14 h-16 w-16 rounded-3xl border border-cyan-200/30 bg-cyan-200/10 backdrop-blur-2xl" />

                  <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-300">Nerestore Dashboard</div>
                        <div className="mt-1 text-xs text-slate-500">Live order preview</div>
                      </div>
                      <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">Active</div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {products.slice(0, 3).map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.07] p-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300/30 to-violet-300/20 text-sm font-black text-white">
                              0{index + 1}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{product.displayTitle}</div>
                              <div className="text-xs text-slate-400">Ready • Instant</div>
                            </div>
                          </div>
                          <div className="text-sm font-black text-cyan-100">Rp {formatIDR(product.price)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-3xl bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 p-px">
                      <div className="rounded-3xl bg-slate-950/80 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-300">Estimasi total</span>
                          <span className="text-lg font-black text-white">Rp {formatIDR(products[0]?.price || 0)}</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300" style={{ animation: 'pulse-ring 2.8s ease-in-out infinite' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="liquid-glass rounded-[2rem] p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-xl">{feature.icon}</div>
                <h3 className="mt-5 text-lg font-black text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="produk" className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200/70">Katalog Premium</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Pilih layanan terbaik</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Produk sudah dirapikan dengan kartu liquid glass, badge status, dan checkout cepat via WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="glass-button justify-center"
            >
              Lihat Keranjang ({cart.length}) • Rp {formatIDR(total)}
            </button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
            ))}
          </div>

          <div className="liquid-glass mt-12 rounded-[2rem] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200/70">Custom Request</div>
                <h3 className="mt-3 text-2xl font-black text-white">Butuh layanan custom?</h3>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Chat admin Nerestore untuk kebutuhan khusus, paket bundling, atau konsultasi sebelum checkout.
                </p>
              </div>
              <a
                href="https://wa.me/6289601570287"
                target="_blank"
                rel="noreferrer"
                className="gradient-button text-center"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {toast.open && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-cyan-200/30 bg-slate-950/80 px-6 py-3 text-sm font-bold text-cyan-100 shadow-[0_24px_80px_rgba(34,211,238,0.22)] backdrop-blur-2xl">
          {toast.message}
        </div>
      )}

      <CartModal open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

      <Footer />
    </div>
  )
}
