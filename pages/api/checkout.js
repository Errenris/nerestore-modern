import { Pakasir } from 'pakasir'
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { cart } = req.body;
  if (!cart || cart.length === 0) return res.status(400).json({ message: 'Keranjang kosong' })

  const amount = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
  const orderId = `NRS-${Date.now()}`

  try {
    const client = await clientPromise;
    const db = client.db('nerestore');
    
    // Bikin catatan pesanan dengan status 'PENDING'
    await db.collection('orders').insertOne({
      orderId,
      cart,
      amount,
      status: 'PENDING',
      linksGiven: [],
      createdAt: new Date()
    });

    const pakasir = new Pakasir({ project: process.env.PAKASIR_PROJECT, api_key: process.env.PAKASIR_API_KEY });
    const transaction = await pakasir.createTransaction(
      orderId, 'QRIS', amount, false, 
      `https://nerestore.vercel.app/order/${orderId}` // Arahkan pembeli ke halaman Invoice setelah bayar
    );

    if (transaction && transaction.payment && transaction.payment.payment_url) {
      res.status(200).json({ paymentUrl: transaction.payment.payment_url })
    } else {
      res.status(400).json({ message: 'Pakasir gagal memproses' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
