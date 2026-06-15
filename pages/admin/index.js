import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import initialProducts from '../../data/products.json'

export default function AdminDashboard() {
  const [products, setProducts] = useState(initialProducts)
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', stock: 99 })

  // Simulasi Tambah Produk
  const handleAddProduct = (e) => {
    e.preventDefault()
    const productToAdd = {
      id: Date.now(),
      ...newProduct,
      image: '/placeholder.png'
    }
    setProducts([...products, productToAdd])
    setIsAdding(false)
    setNewProduct({ title: '', price: '', description: '', stock: 99 })
    alert("Produk berhasil ditambahkan! (Simulasi: Untuk permanen butuh Database)")
  }

  // Simulasi Hapus Produk
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — Nerestore</title>
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.1),transparent_50%)]" />
        <Header cartCount={0} />

        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black liquid-text">Dashboard Admin</h1>
              <p className="text-slate-400">Kelola produk, stok, dan pantau penjualan.</p>
            </div>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="rounded-xl bg-cyan-400 px-5 py-2.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
            >
              {isAdding ? 'Batal' : '+ Tambah Produk'}
            </button>
          </motion.div>

          {/* Form Tambah Produk */}
          {isAdding && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleAddProduct}
              className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <h2 className="mb-4 text-xl font-bold text-cyan-200">Produk Baru</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Nama Produk" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                <input required type="number" placeholder="Harga (Rp)" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input required type="number" placeholder="Stok" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                <input required placeholder="Deskripsi Singkat" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-400" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
              </div>
              <button type="submit" className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 py-3 font-bold text-slate-950">Simpan Produk</button>
            </motion.form>
          )}

          {/* Tabel Produk */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="border-b border-white/10 bg-white/5 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Stok</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-medium text-white">{p.displayTitle || p.title}</td>
                    <td className="px-6 py-4">Rp {new Intl.NumberFormat('id-ID').format(Number(p.price))}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-400 border border-emerald-400/20">{p.stock || '∞'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 font-semibold">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
