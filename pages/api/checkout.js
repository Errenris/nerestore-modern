// pages/api/checkout.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { cart, customerName, customerEmail } = req.body;

  // Hitung total harga
  const amount = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0)

  // Buat referensi order unik
  const orderId = `NRS-${Date.now()}`

  try {
    // Memanggil API Pakasir (Pastikan endpoint & header sesuai dokumentasi Pakasir)
    // Dokumentasi: https://pakasir.com/p/docs
    const response = await fetch('https://api.pakasir.com/v1/transaction/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Masukkan API KEY Pakasir kamu di Environment Variables Vercel nanti
        'Authorization': `Bearer ${process.env.PAKASIR_API_KEY}` 
      },
      body: JSON.stringify({
        order_id: orderId,
        amount: amount,
        customer_details: {
          name: customerName || "Pelanggan Nerestore",
          email: customerEmail || "buyer@email.com",
        },
        item_details: cart.map(item => ({
          name: item.title,
          price: item.price,
          quantity: 1
        })),
        // URL jika sukses bayar
        return_url: "https://nerestoree.vercel.app/success"
      })
    })

    const result = await response.json()

    if (response.ok) {
      // Mengirim link pembayaran Pakasir kembali ke pengunjung
      res.status(200).json({ paymentUrl: result.data.payment_url })
    } else {
      res.status(400).json({ message: 'Gagal membuat transaksi Pakasir', error: result })
    }
  } catch (error) {
    console.error("Payment Gateway Error:", error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
