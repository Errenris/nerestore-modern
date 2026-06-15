import { Pakasir } from 'pakasir'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { cart } = req.body;
  
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Keranjang kosong' })
  }

  // Hitung total belanja dari item di keranjang
  const amount = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
  const orderId = `NRS-${Date.now()}`

  try {
    // Inisialisasi Klien Pakasir menggunakan env Vercel
    const pakasir = new Pakasir({
      project: process.env.PAKASIR_PROJECT, 
      api_key: process.env.PAKASIR_API_KEY  
    });

    // Request Link Pembayaran QRIS
    const transaction = await pakasir.createTransaction(
      orderId,
      'QRIS', 
      amount,
      false, 
      'https://nerestore.vercel.app/' // URL kembali setelah bayar sukses
    );

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
