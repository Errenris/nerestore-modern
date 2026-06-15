import Head from 'next/head'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
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

  return (
    <>
      <Head>
        <title>Nerestore — Digital Store & Bot Services</title>
        <meta
          name="description"
          content="Nerestore: template, tools, dan layanan digital dengan tampilan modern liquid glass."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(167,139,250,0.24),transparent_28%),linear-gradient(135deg,#020617_0%,#08111f_48%,#020617_100%)]" 
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        </div>

        <Header cartCount={cart.length} onCart={() => setOpen(true)} />

        <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 py-12 lg:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="mb-5 inline-flex cursor-pointer rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur"
              >
                ✨ Digital Store Premium
              </motion.div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl liquid-text">
                Nerestore untuk kebutuhan digital kamu.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                Belanja produk digital, tools, template, dan layanan bot dengan proses cepat, tampilan modern, dan support admin responsif.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#products"
                  className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition hover:bg-cyan-300"
                >
                  Lihat Produk
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(true)}
                  className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Keranjang • Rp{formatIDR(total)}
                </motion.button>
              </div>

              <motion.div variants={containerVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition-colors"
                  >
                    <div className="text-xl">{item.icon}</div>
                    <div className="mt-2 text-2xl font-black">{item.value}</div>
                    <div className="text-sm text-slate-300">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_0_50px_rgba(139,92,246,0.15)] backdrop-blur"
            >
              <div className="rounded-[1.5rem] bg-slate-950/70 p-6">
                <div className="text-sm text-cyan-200">Checkout Preview</div>
                <div className="mt-3 text-3xl font-black">Cepat, aman, rapi.</div>

                <motion.div variants={containerVariants} className="mt-6 space-y-3">
                  {features.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <div className="font-bold">{item.title}</div>
                          <div className="text-sm leading-6 text-slate-300">{item.text}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 py-8 sm:grid-cols-3"
          >
            {stats.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <div className="text-3xl font-black text-cyan-200">{item.value}</div>
                <div className="mt-1 font-bold">{item.label}</div>
                <div className="text-sm text-slate-300">{item.detail}</div>
              </motion.div>
            ))}
          </motion.section>

          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="py-10"
          >
            <motion.div variants={itemVariants} className="mb-7">
              <h2 className="text-3xl font-black">Kenapa pilih Nerestore?</h2>
              <p className="mt-2 text-slate-300">
                Layanan dibuat simpel biar kamu bisa order tanpa ribet.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-3">
              {benefits.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-300">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <section id="products" className="py-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <h2 className="text-3xl font-black">Produk Digital</h2>
                <p className="mt-2 text-slate-300">
                  Pilih produk, masuk keranjang, lalu checkout via WhatsApp.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 font-bold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                Buka Keranjang ({cart.length})
              </motion.button>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id || product.title}
                  product={product}
                  onAdd={() => addToCart(product)}
                />
              ))}
            </div>
          </section>
        </main>

        {toast.open && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-bold text-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {toast.message}
          </motion.div>
        )}

        <CartModal open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

        <Footer />
      </div>
    </>
  )
}
