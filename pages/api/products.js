import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('nerestore'); 
    const collection = db.collection('products');

    // 1. Ambil Semua Produk
    if (req.method === 'GET') {
      const products = await collection.find({}).sort({ id: -1 }).toArray();
      // Sembunyikan daftar link rahasia agar tidak bocor ke pembeli yang iseng ngecek API
      const safeProducts = products.map(p => ({ ...p, links: undefined }));
      return res.status(200).json(safeProducts);
    }

    // 2. Tambah Produk Baru
    if (req.method === 'POST') {
      const { title, description, price, linksData, image } = req.body;
      const linkArray = linksData ? linksData.split('\n').map(l => l.trim()).filter(l => l !== '') : [];
      
      await collection.insertOne({
        id: Date.now().toString(),
        title,
        description,
        price,
        stock: linkArray.length, 
        links: linkArray,        
        image: image || '/placeholder.png'
      });
      return res.status(201).json({ message: 'Produk berhasil disimpan!' });
    }

    // 3. EDIT / UPDATE PRODUK LAMA (INI YANG BARU)
    if (req.method === 'PUT') {
      const { id, title, description, price, linksData, image } = req.body;
      const linkArray = linksData ? linksData.split('\n').map(l => l.trim()).filter(l => l !== '') : [];
      
      await collection.updateOne(
        { id: id },
        { 
          $set: { 
            title, 
            description, 
            price, 
            stock: linkArray.length, // Stok otomatis update menyesuaikan jumlah baris link
            links: linkArray, 
            image: image || '/placeholder.png' 
          } 
        }
      );
      return res.status(200).json({ message: 'Produk berhasil diupdate!' });
    }

    // 4. Hapus Produk
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
