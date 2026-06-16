import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function CartModal({ cart, onClose, onRemove, onCheckout }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Hitung total harga (dengan pengaman kalau cart kosong)
  const total = cart?.reduce((acc, item) => acc + (Number(item.price) || 0), 0) || 0

  const handleCheckoutQRIS = () => {
    setIsCheckingOut(true)
    onCheckout()
  }

  // === FITUR BARU: BELI VIA WA ===
  const handleCheckoutWA = () => {
    // 1. Ganti dengan nomor WA Admin (Gunakan format 62 tanpa + atau 0)
    const adminPhone = "6289601570287" 
    
    // 2. Buat rincian pesanan dari keranjang
    let orderDetails = cart.map((item, index) => `${index + 1}. ${item.title} (Rp ${new Intl.NumberFormat('id-ID').format(Number(item.price))})`).join('%0A')
    
    // 3. Buat format pesan WA
    const message = `Halo Admin Nerestore, saya mau order manual nih:%0A%0A*Rincian Pesanan:*%0A${orderDetails}%0A%0A*Total Pembayaran:* Rp ${new Intl.NumberFormat('id-ID').format(total)}%0A%0AMohon info rekening pembayarannya ya. Terima kasih!`
    
    // 4. Arahkan pembeli ke WhatsApp
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Latar Belakang Gelap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Kotak Keranjang */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-slate-900 border border-white/10 shadow-2xl"
        >
          {/* Efek Cahaya */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <span className="text-cyan-400">🛒</span> Keranjang
              </h2>
              <button 
                onClick={onClose} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition z-10 relative"
              >
                ✕
              </button>
            </div>

            {!cart || cart.length === 0 ? (
              <div className="text-center py-10 relative z-10">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-slate-400 font-medium">Keranjang kamu masih kosong.</p>
              </div>
            ) : (
              <>
                {/* Daftar Item di Keranjang */}
                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-3 mb-6 custom-scrollbar relative z-10">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                      <div className="flex-1 truncate pr-4">
                        <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                        <p className="text-xs text-cyan-400 font-mono mt-0.5">
                          Rp {new Intl.NumberFormat('id-ID').format(Number(item.price))}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(idx)}
                        className="text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/10 transition"
                        title="Hapus"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Bagian Bawah (Total & Tombol) */}
                <div className="border-t border-white/10 pt-5 relative z-10">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Total Tagihan</span>
                    <span className="text-2xl font-black text-white">
                      Rp {new Intl.NumberFormat('id-ID').format(total)}
                    </span>
                  </div>

                  {/* TOMBOL PEMBAYARAN */}
                  <div className="space-y-3 relative z-10">
                    {/* Tombol QRIS Otomatis */}
                    <button
                      disabled={isCheckingOut}
                      onClick={handleCheckoutQRIS}
                      className="w-full relative overflow-hidden rounded-xl bg-cyan-400 px-4 py-4 text-sm font-black text-slate-950 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isCheckingOut ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Memproses QRIS...
                        </span>
                      ) : (
                        "Beli Sekarang (QRIS Otomatis) ⚡"
                      )}
                    </button>

                    {/* Tombol WA Manual */}
                    <button
                      onClick={handleCheckoutWA}
                      className="w-full rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-3.5 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/20 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                        </svg>
                        Order Manual (WhatsApp)
                      </button>
                      
                      <p className="text-[10px] text-center text-slate-500 mt-2">
                        *Order manual via WA tidak diproses otomatis oleh sistem.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
    </AnimatePresence>
  )
}
