import { useMemo, useState } from 'react'

function formatIDR(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return new Intl.NumberFormat('id-ID').format(num)
}

export default function CartModal({ open, setOpen, cart, setCart }) {
  const [showQR, setShowQR] = useState(false)

  const total = useMemo(
    () => cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [cart]
  )

  if (!open) return null

  const removeAt = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx))

  const buildMessage = () => {
    const lines = cart.map((p, i) => `${i + 1}. ${p.displayTitle || p.title} — Rp ${formatIDR(p.price)}`)
    lines.push(`\nTotal: Rp ${formatIDR(total)}`)
    lines.push(`\nNama: `)
    lines.push(`Alamat/Email (jika perlu): `)
    return encodeURIComponent(lines.join('\n'))
  }

  const checkoutWA = () => {
    const wa = '6280000000000' // ganti nomor WA kamu
    const url = `https://wa.me/${wa}?text=${buildMessage()}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <div className="text-white font-bold">Keranjang</div>
            <div className="text-xs text-gray-400">{cart.length} item</div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            Tutup
          </button>
        </div>

        <div className="max-h-[60vh] overflow-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 p-6 text-sm text-gray-400">
              Keranjang masih kosong.
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((p, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div>
                    <div className="text-white font-semibold">{p.displayTitle || p.title}</div>
                    <div className="text-sm text-gray-400">Rp {formatIDR(p.price)}</div>
                  </div>
                  <button
                    onClick={() => removeAt(idx)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 transition"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm text-gray-400">Total</div>
            <div className="text-white font-extrabold">Rp {formatIDR(total)}</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              disabled={cart.length === 0}
              onClick={checkoutWA}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition disabled:opacity-40"
            >
              Checkout via WhatsApp
            </button>

            <button
              onClick={() => setShowQR((v) => !v)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              {showQR ? 'Tutup QRIS' : 'Lihat QRIS'}
            </button>

            <button
              disabled={cart.length === 0}
              onClick={() => setCart([])}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition disabled:opacity-40"
            >
              Clear
            </button>
          </div>

          {showQR && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-gray-300">QRIS</div>
              <img src="/qris.jpg" alt="QRIS" className="mt-3 w-full rounded-xl border border-white/10" />
              <p className="mt-3 text-xs text-gray-500">Setelah transfer, kirim bukti via WhatsApp.</p>
            </div>
          )}

          <p className="mt-6 text-xs text-gray-500">
            Catatan: gunakan produk/layanan sesuai ketentuan platform terkait.
          </p>
        </div>
      </div>
    </div>
  )
}
