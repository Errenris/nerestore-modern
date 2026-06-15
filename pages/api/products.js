import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    // Nama database bebas, kita kasih nama 'nerestore'
    const db = client.db('nerestore'); 
    const collection = db.collection('products');

    // 1. Ambil Semua Produk
    if (req.method === 'GET') {
      const products = await collection.find({}).sort({ id: -1 }).toArray();
      return res.status(200).json(products);
    }

    // 2. Tambah Produk Baru
    if (req.method === 'POST') {
      const newProduct = req.body;
      newProduct.id = Date.now().toString(); // Buat ID unik biar gampang dihapus
      newProduct.image = newProduct.image || '/placeholder.png';

      await collection.insertOne(newProduct);
      return res.status(201).json({ message: 'Produk berhasil disimpan ke MongoDB!' });
    }

    // 3. Hapus Produk
    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ id: id });
      return res.status(200).json({ message: 'Produk berhasil dihapus!' });
    }

    return res.status(405).json({ message: 'Method tidak diizinkan' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
