import { useState } from 'react'

export default function CartPopup({ open, setOpen, cart, removeItem, total }) {
  const [showQR, setShowQR] = useState(false)

  const QRIS_URL = "/qris.jpg"
  const WA_URL = `https://wa.me/628xxxxxxxxxx?text=Mau checkout, total: Rp ${total}` // ganti nomor

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* QRIS OVERLAY */}
      {showQR && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-800/90 p-5 shadow-2xl border border-white/10">
            <h2 className="text-xl font-semibold mb-1">Pembayaran QRIS</h2>
            <p className="text-xs text-gray-300 mb-4">
              Scan kode QR di bawah ini untuk menyelesaikan pembayaran. Setelah itu, tekan tombol
              untuk konfirmasi via WhatsApp.
            </p>

            <div className="flex justify-center mb-4">
              <img
                src={QRIS_URL}
                className="w-56 rounded-xl shadow-xl border border-white/10"
                alt="QRIS"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  window.open(WA_URL, "_blank")
                  setShowQR(false)
                  setOpen(false)
                }}
                className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-medium hover:bg-emerald-600 transition"
              >
                ✅ Sudah bayar, lanjut WhatsApp
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="w-full rounded-xl bg-slate-800 py-2.5 text-sm font-medium hover:bg-slate-700 border border-white/10 transition"
              >
                Kembali ke keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP KERANJANG */}
      <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-semibold">Keranjang</h2>
            <p className="text-xs text-gray-400">Produk yang akan kamu checkout</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-6">
            Keranjang masih kosong
          </div>
        ) : (
          <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
            {cart.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-slate-800/70 px-3 py-2.5 border border-white/5"
              >
                <span className="text-sm font-medium">{item.name}</span>
                <button
                  onClick={() => removeItem(i)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}

        <hr className="my-3 border-slate-700" />

        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-gray-300">Total</span>
          <span className="font-semibold text-emerald-400">Rp {total}</span>
        </div>

        <button
          onClick={() => setShowQR(true)}
          className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-medium mb-2 hover:bg-emerald-600 shadow-md transition"
        >
          Checkout (Bayar via QRIS)
        </button>

        <button
          onClick={() => setOpen(false)}
          className="w-full rounded-xl bg-slate-800 py-2.5 text-sm hover:bg-slate-700 border border-white/10 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}
