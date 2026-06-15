import { useMemo, useState } from 'react'

function formatIDR(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return new Intl.NumberFormat('id-ID').format(num)
}

export default function CartModal({ open, setOpen, cart, setCart }) {
  const [showQR, setShowQR] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const total = useMemo(
    () => cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [cart]
  )

  if (!open) return null

  const removeAt = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx))

  // Fungsi Checkout Baru (Otomatis via Pakasir)
  const checkoutPakasir = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cart }) 
      })
      
      const data = await response.json()
      
      if (data.paymentUrl) {
        // Arahkan pembeli ke halaman pembayaran Pakasir
        window.location.href = data.paymentUrl
      } else {
        alert("Gagal memproses pembayaran. Pastikan API Key Pakasir valid di Vercel.")
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.")
    }
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-2xl">
      <div className="liquid-panel w-full max-w-2xl overflow-hidden rounded-[2.25rem] shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100/60">Checkout</div>
            <div className="mt-1 text-2xl font-black text-white">Keranjang</div>
            <div className="text-xs text-slate-400">{cart.length} item siap diproses</div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15"
          >
            Tutup
          </button>
        </div>

        <div className="max-h-[68vh] overflow-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/20 bg-white/[0.04] p-6 text-sm leading-6 text-slate-300">
              Keranjang masih kosong. Silakan pilih produk terlebih dahulu.
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((p, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <div>
                    <div className="font-bold text-white">{p.displayTitle || p.title}</div>
                    <div className="mt-1 text-sm text-cyan-100/70">Rp {formatIDR(p.price)}</div>
                  </div>
                  <button
                    onClick={() => removeAt(idx)}
                    className="rounded-full border border-rose-200/20 bg-rose-400/10 px-3 py-2 text-xs font-bold text-rose-100 transition hover:bg-rose-400/20"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-[1.6rem] border border-cyan-200/20 bg-cyan-300/10 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-cyan-50/75">Total Pembayaran</div>
              <div className="text-2xl font-black text-white">Rp {formatIDR(total)}</div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              disabled={cart.length === 0 || isLoading}
              onClick={checkoutPakasir}
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? 'Memproses...' : 'Checkout Otomatis (Pakasir)'}
            </button>

            <button
              onClick={() => setShowQR((v) => !v)}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
            >
              {showQR ? 'Tutup QRIS' : 'Lihat QRIS'}
            </button>

            <button
              disabled={cart.length === 0}
              onClick={() => setCart([])}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Bersihkan
            </button>
          </div>

          {showQR && (
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
              <div className="text-sm font-bold text-white">QRIS Pembayaran (Manual)</div>
              <img src="/qris.jpg" alt="QRIS" className="mt-3 w-full rounded-2xl border border-white/10" />
              <p className="mt-3 text-xs leading-5 text-slate-400">Jika checkout otomatis gagal, gunakan metode manual lalu chat admin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
