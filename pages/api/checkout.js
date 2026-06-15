import { Pakasir } from 'pakasir'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { cart } = req.body;
  
  // Hitung total belanja
  const amount = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
  
  // Buat ID Order Unik
  const orderId = `NRS-${Date.now()}`

  try {
    // Inisialisasi Klien Pakasir
    const pakasir = new Pakasir({
      project: process.env.PAKASIR_PROJECT, // Setup di Vercel: nama slug project
      api_key: process.env.PAKASIR_API_KEY  // Setup di Vercel: API Key
    });

    // Melakukan request pembuatan URL Pembayaran
    const transaction = await pakasir.createTransaction(
      orderId,
      'QRIS', // Metode Pembayaran utama
      amount,
      false, // Jangan buat direct QRIS, agar masuk ke Payment Page
      'https://nerestoree.vercel.app/' // URL kembali setelah sukses bayar
    );

    // Mengecek apakah Pakasir mengembalikan URL pembayaran
    if (transaction && transaction.payment && transaction.payment.payment_url) {
      res.status(200).json({ paymentUrl: transaction.payment.payment_url })
    } else {
      res.status(400).json({ message: 'Pakasir gagal mengembalikan URL', data: transaction })
    }

  } catch (error) {
    console.error("Payment Gateway Error:", error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
