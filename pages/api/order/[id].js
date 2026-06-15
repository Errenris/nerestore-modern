import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db('nerestore');
    const order = await db.collection('orders').findOne({ orderId: id });
    
    if (!order) return res.status(404).json({ error: 'Invoice tidak ditemukan' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error mengambil data invoice' });
  }
}
