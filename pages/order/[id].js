import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function OrderPage() {
  const router = useRouter()
  const { id } = router.query
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (!id) return;
    
    // Robot ini akan cek status lunas setiap 3 detik
    const interval = setInterval(() => {
      fetch(`/api/order/${id}`).then(res => res.json()).then(data => {
        setOrder(data);
        if (data.status === 'PAID') clearInterval(interval);
      })
    }, 3000);

    fetch(`/api/order/${id}`).then(res => res.json()).then(setOrder);
    return () => clearInterval(interval);
  }, [id])

  if (!order) return <div className="text-center py-20 text-white bg-slate-950 min-h-screen">Mencari detail pesanan...</div>

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Head><title>Invoice #{order.orderId}</title></Head>
      <Header cartCount={0} />
      <main className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          <h1 className="text-3xl font-black mb-2">Invoice Pesanan</h1>
          <p className="text-slate-400 text-sm font-mono tracking-wider">ID: {order.orderId}</p>

          <div className={`mt-8 p-5 rounded-2xl font-bold text-center text-lg shadow-inner ${order.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
            {order.status === 'PAID' ? 'PEMBAYARAN LUNAS ✅' : 'MENUNGGU PEMBAYARAN ⏳'}
          </div>

          {order.status === 'PAID' && order.linksGiven && (
            <div className="mt-10">
              <h2 className="text-2xl font-black text-cyan-300 mb-5">🎁 Link Akses Produk Kamu:</h2>
              <div className="space-y-4">
                {order.linksGiven.map((item, i) => (
                  <div key={i} className="bg-black/50 p-5 rounded-2xl border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <div className="text-sm text-cyan-100/60 font-semibold mb-2 uppercase tracking-widest">{item.productName}</div>
                    <a href={item.link.startsWith('http') ? item.link : `https://${item.link}`} target="_blank" rel="noreferrer" className="text-cyan-400 font-bold text-lg hover:underline break-all block">
                      {item.link}
                    </a>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-slate-400 text-center font-semibold">Tolong simpan link di atas atau *bookmark* halaman ini sebelum hilang.</p>
            </div>
          )}

          {order.status === 'PENDING' && (
            <p className="mt-8 text-sm text-slate-400 text-center animate-pulse">
              Halaman ini akan me-refresh otomatis jika kamu sudah selesai membayar...
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
