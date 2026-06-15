import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('nerestore'); 
    const collection = db.collection('products');

    if (req.method === 'GET') {
      const products = await collection.find({}).sort({ id: -1 }).toArray();
      // Sembunyikan daftar link rahasia agar tidak bocor ke publik
      const safeProducts = products.map(p => ({ ...p, links: undefined }));
      return res.status(200).json(safeProducts);
    }

    if (req.method === 'POST') {
      const { title, description, price, linksData, image } = req.body;
      
      // Pisahkan baris teks menjadi array link sungguhan
      const linkArray = linksData ? linksData.split('\n').map(l => l.trim()).filter(l => l !== '') : [];
      
      await collection.insertOne({
        id: Date.now().toString(),
        title,
        description,
        price,
        stock: linkArray.length, // Stok dihitung otomatis dari jumlah link
        links: linkArray,        // Antrean link rahasia
        image: image || '/placeholder.png'
      });
      return res.status(201).json({ message: 'Produk berhasil disimpan!' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ id: id });
      return res.status(200).json({ message: 'Produk berhasil dihapus!' });
    }

    return res.status(405).json({ message: 'Method tidak diizinkan' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
