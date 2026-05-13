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

      <Head>
        <title>Nerestore — Digital Store & Bot Services</title>
        <meta
          name="description"
          content="Nerestore: template, tools, dan layanan digital dengan tampilan modern liquid glass."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(167,139,250,0.24),transparent_28%),linear-gradient(135deg,#020617_0%,#08111f_48%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      </div>


          </div>
        </section>


          {toast.message}
        </div>
      )}

      <CartModal open={open} setOpen={setOpen} cart={cart} setCart={setCart} />

      <Footer />
    </div>
  )
}
