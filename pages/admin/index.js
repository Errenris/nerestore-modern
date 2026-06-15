import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', stock: 99 })

  const refreshProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data)
      })
  }

  useEffect(() => {
    refreshProducts()
  }, [])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
      
      if (response.ok) {
        alert("Produk berhasil disimpan ke MongoDB! 🎉")
        setIsAdding(false)
        setNewProduct({ title: '', price: '', description: '', stock: 99 })
        refreshProducts()
      } else {
        // INI YANG BARU: Menangkap pesan error asli dari Vercel/MongoDB
        const errData = await response.json()
        alert("GAGAL: " + (errData.error || errData.message || "Kesalahan Server tidak diketahui"))
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi jaringan.")
    }
    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus produk ini?")) return
    try {
      const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        alert("Produk berhasil dihapus secara permanen!")
        refreshProducts()
      } else {
        const errData = await response.json()
        alert("Gagal Hapus: " + (errData.error || errData.message))
      }
    } catch (err) {
      alert("Gagal menghapus produk.")
    }
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
              <p className="text-slate-400">Kelola produk jualan asli di MongoDB.</p>
            </div>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="rounded-xl bg-cyan-400 px-5 py-2.5 font-bold text-slate-950 shadow-lg"
            >
              {isAdding ? 'Batal' : '+ Tambah Produk'}
            </button>
          </motion.div>

          {isAdding && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleAddProduct}
              className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <h2 className="mb-4 text-xl font-bold text-cyan-200">Produk Baru</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Nama Produk" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                <input required type="number" placeholder="Harga (Rp)" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input required type="number" placeholder="Stok" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                <input required placeholder="Deskripsi Singkat" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
              </div>
              <button disabled={isLoading} type="submit" className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 py-3 font-bold text-slate-950">
                {isLoading ? 'Menyimpan...' : 'Simpan ke Database'}
              </button>
            </motion.form>
          )}

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
                    <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                    <td className="px-6 py-4">Rp {new Intl.NumberFormat('id-ID').format(Number(p.price))}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-400 border border-emerald-400/20">{p.stock}</span>
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
