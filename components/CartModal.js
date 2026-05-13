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
    lines.push(`Alamat/Email Canva (jika perlu): `)
    return encodeURIComponent(lines.join('\n'))
  }

  const checkoutWA = () => {
    const wa = '6289601570287'
    const url = `https://wa.me/${wa}?text=${buildMessage()}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-xl">
      <div className="liquid-glass w-full max-w-2xl overflow-hidden rounded-[2rem]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <div className="text-xl font-black text-white">Keranjang</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/55">{cart.length} item dipilih</div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15"
          >
            Tutup
          </button>
        </div>

        <div className="max-h-[72vh] overflow-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.04] p-8 text-center text-sm text-slate-300">
              Keranjang masih kosong. Pilih produk premium dulu untuk lanjut checkout.
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((p, idx) => (
                <div key={`${p.id}-${idx}`} className="flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                  <div>
                    <div className="font-bold text-white">{p.displayTitle || p.title}</div>
                    <div className="mt-1 text-sm text-cyan-100">Rp {formatIDR(p.price)}</div>
                  </div>
                  <button
                    onClick={() => removeAt(idx)}
                    className="rounded-2xl border border-rose-200/20 bg-rose-400/10 px-3 py-2 text-xs font-bold text-rose-100 transition hover:bg-rose-400/20"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-3xl border border-cyan-200/20 bg-cyan-100/10 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-300">Total pembayaran</div>
                <div className="mt-1 text-xs text-slate-500">Belum termasuk catatan custom jika ada</div>
              </div>
              <div className="text-2xl font-black text-white">Rp {formatIDR(total)}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button
              disabled={cart.length === 0}
              onClick={checkoutWA}
              className="rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Checkout WA
            </button>

            <button
              onClick={() => setShowQR((v) => !v)}
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              {showQR ? 'Tutup QRIS' : 'Lihat QRIS'}
            </button>

            <button
              disabled={cart.length === 0}
              onClick={() => setCart([])}
              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear
            </button>
          </div>

          {showQR && (
            <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
              <div className="text-sm font-bold text-white">Pembayaran QRIS</div>
              <img src="/qris.jpg" alt="QRIS" className="mt-3 w-full rounded-2xl border border-white/10" />
              <p className="mt-3 text-xs leading-5 text-slate-400">Setelah transfer, kirim bukti pembayaran via WhatsApp agar pesanan cepat diproses.</p>
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-slate-500">
            Catatan: gunakan produk/layanan sesuai ketentuan platform terkait. Untuk pembayaran, buka QRIS lalu konfirmasi ke admin.
          </p>
        </div>
      </div>
    </div>
  )
}
