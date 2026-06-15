const [isLoading, setIsLoading] = useState(false)

  // Fungsi Checkout Baru (Otomatis via Pakasir)
  const checkoutPakasir = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cart }) // Bisa tambah input nama/email jika ada
      })
      
      const data = await response.json()
      
      if (data.paymentUrl) {
        // Arahkan pembeli ke halaman pembayaran Pakasir
        window.location.href = data.paymentUrl
      } else {
        alert("Gagal memproses pembayaran. Pastikan API Key valid.")
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.")
    }
    setIsLoading(false)
  }

  // --- NANTI DI BAGIAN TOMBOL (Gantikan tombol Checkout WA sebelumnya) ---
  // <button
  //   disabled={cart.length === 0 || isLoading}
  //   onClick={checkoutPakasir}
  //   className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
  // >
  //   {isLoading ? 'Memproses...' : 'Checkout Otomatis (Pakasir)'}
  // </button>
