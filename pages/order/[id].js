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

  if (!order) return <div className="text-center py-20 text-white bg-slate-950 min-h-screen flex items-center justify-center font-bold animate-pulse">Mencari detail pesanan...</div>

  // Format tanggal biar rapi ala Indonesia
  const orderDate = order.createdAt 
    ? new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) 
    : 'Waktu tidak diketahui';

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Head><title>Invoice #{order.orderId}</title></Head>
      <Header cartCount={0} />
      
      <main className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-slate-900 border border-white/10 p-6 sm:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          
          {/* Efek Cahaya Latar */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>

          {/* Header Invoice */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-8 relative z-10">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">INVOICE PESANAN</h1>
              <p className="text-cyan-400 font-mono mt-1 font-bold">{order.orderId}</p>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Tanggal Transaksi</p>
              <p className="font-semibold text-white">{orderDate}</p>
            </div>
          </div>

          {/* Status Pembayaran */}
          <div className={`p-5 rounded-2xl font-black text-center text-lg mb-8 shadow-inner border relative z-10 transition-colors duration-500 ${order.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
            {order.status === 'PAID' ? 'PEMBAYARAN LUNAS ✅' : 'MENUNGGU PEMBAYARAN ⏳'}
          </div>

          {/* Rincian Produk yang Dibeli */}
          <div className="mb-10 relative z-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">🛒</span> Rincian Produk
            </h2>
            <div className="bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 border-b border-white/5 text-slate-400">
                  <tr>
                    <th className="p-4 font-semibold uppercase tracking-wider text-xs">Nama Item</th>
                    <th className="p-4 font-semibold uppercase tracking-wider text-xs text-right">Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {order.cart?.map((item, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white text-base">{item.title}</div>
                      </td>
                      <td className="p-4 text-right font-mono text-slate-300 font-semibold text-base">
                        Rp {new Intl.NumberFormat('id-ID').format(Number(item.price))}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-cyan-500/5 border-t border-cyan-500/20">
                  <tr>
                    <td className="p-4 font-black text-white text-right text-base">TOTAL TAGIHAN:</td>
                    <td className="p-4 font-black text-cyan-400 text-right text-xl font-mono">
                      Rp {new Intl.NumberFormat('id-ID').format(Number(order.amount))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Hasil / Link Akses Digital */}
          {order.status === 'PAID' && order.linksGiven && (
            <div className="mt-8 border-t border-white/10 pt-8 relative z-10">
              <h2 className="text-2xl font-black text-emerald-400 mb-6 flex items-center gap-3">
                <span className="bg-emerald-500/20 p-2 rounded-xl">🎁</span> Link Akses Kamu
              </h2>
              
              <div className="space-y-4">
                {order.linksGiven.map((item, i) => (
                  <div key={i} className="bg-gradient-to-r from-emerald-500/10 to-transparent p-6 rounded-2xl border border-emerald-500/20 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 rounded-l-2xl"></div>
                    <div className="text-xs text-emerald-200/70 font-semibold mb-2 uppercase tracking-widest">Akses untuk: {item.productName}</div>
                    
                    <a 
                      href={item.link.startsWith('http') ? item.link : `https://${item.link}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-cyan-300 font-black text-lg sm:text-xl hover:text-cyan-100 hover:underline break-all block"
                    >
                      {item.link}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex items-start gap-4">
                <span className="text-2xl">⚠️</span>
                <p className="text-sm text-amber-200/90 font-medium leading-relaxed">
                  <strong className="text-amber-400 block mb-1">SANGAT PENTING:</strong> 
                  Tolong segera klik dan simpan link di atas, atau <b>Bookmark</b> halaman invoice ini sekarang juga. Sistem tidak mengirim ulang link melalui email atau chat.
                </p>
              </div>
            </div>
          )}

          {/* Loading nunggu Pakasir */}
          {order.status === 'PENDING' && (
            <div className="mt-8 bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-slate-300 font-medium">
                Sistem sedang menunggu konfirmasi pembayaranmu...
              </p>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
