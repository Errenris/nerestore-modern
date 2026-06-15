import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // 1. Ambil Semua Produk dari Database
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM products ORDER BY id DESC;`;
      return res.status(200).json(rows);
    }

    // 2. Tambah Produk Baru dari Dashboard Admin
    if (req.method === 'POST') {
      const { title, description, price, stock, image } = req.body;
      
      if (!title || !price) {
        return res.status(400).json({ message: 'Nama dan Harga wajib diisi' });
      }

      await sql`
        INSERT INTO products (title, description, price, stock, image)
        VALUES (${title}, ${description}, ${price}, ${Number(stock) || 0}, ${image || '/placeholder.png'});
      `;
      return res.status(201).json({ message: 'Produk berhasil disimpan ke database!' });
    }

    // 3. Hapus Produk Secara Permanen
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: 'ID diperlukan' });

      await sql`DELETE FROM products WHERE id = ${id};`;
      return res.status(200).json({ message: 'Produk berhasil dihapus!' });
    }

    return res.status(405).json({ message: 'Method tidak diizinkan' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
