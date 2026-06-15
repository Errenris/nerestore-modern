export default async function handler(req, res) {
  // Mengambil kunci rahasia Redis dari Vercel persis seperti di screenshot kamu
  const KV_URL = process.env.stok_KV_REST_API_URL;
  const KV_TOKEN = process.env.stok_KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(500).json({ error: 'Database belum terhubung dengan benar di Vercel' });
  }

  const headers = {
    Authorization: `Bearer ${KV_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Ambil Semua Produk
    if (req.method === 'GET') {
      const response = await fetch(`${KV_URL}/get/nerestore_products`, { headers });
      const data = await response.json();
      
      let products = [];
      if (data.result) {
        products = JSON.parse(data.result);
      } else {
        // Jika database masih kosong, otomatis buatkan data awal untuk tes
        products = [
          { id: 1, title: 'CANVA PRO 1 BULAN', description: 'Bisa akses semua fitur pro', price: '4000', stock: 99, image: '/placeholder.png' },
          { id: 2, title: 'CANVA DESIGNER 1 BULAN', description: 'Unlock semua fitur', price: '5000', stock: 50, image: '/placeholder.png' },
          { id: 3, title: 'CANVA PRO 1 TAHUN', description: 'Bisa akses semua fitur pro', price: '9000', stock: 20, image: '/placeholder.png' }
        ];
        // Simpan data awal ini ke Redis
        await fetch(`${KV_URL}/set/nerestore_products`, {
          method: 'POST',
          headers,
          body: JSON.stringify(JSON.stringify(products))
        });
      }
      // Urutkan produk terbaru di atas
      return res.status(200).json(products.sort((a, b) => b.id - a.id));
    }

    // 2. Tambah Produk Baru
    if (req.method === 'POST') {
      const newProduct = req.body;
      newProduct.id = Date.now(); // Buat ID unik
      newProduct.image = newProduct.image || '/placeholder.png';

      // Ambil data yang sudah ada
      const getRes = await fetch(`${KV_URL}/get/nerestore_products`, { headers });
      const getData = await getRes.json();
      let products = getData.result ? JSON.parse(getData.result) : [];

      // Masukkan produk baru
      products.push(newProduct);

      // Simpan kembali ke Redis
      await fetch(`${KV_URL}/set/nerestore_products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(JSON.stringify(products))
      });

      return res.status(201).json({ message: 'Produk berhasil disimpan ke Redis!' });
    }

    // 3. Hapus Produk
    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      const getRes = await fetch(`${KV_URL}/get/nerestore_products`, { headers });
      const getData = await getRes.json();
      let products = getData.result ? JSON.parse(getData.result) : [];

      // Filter/hapus produk yang ID-nya sama
      products = products.filter(p => String(p.id) !== String(id));

      // Simpan data terbaru
      await fetch(`${KV_URL}/set/nerestore_products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(JSON.stringify(products))
      });

      return res.status(200).json({ message: 'Produk berhasil dihapus!' });
    }

    return res.status(405).json({ message: 'Method tidak diizinkan' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
