import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', linksData: '' })

  const refreshProducts = () => {
    fetch('/api/products').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setProducts(data)
    })
  }

  useEffect(() => { refreshProducts() }, [])

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
        alert("Produk & Antrean Link berhasil disimpan! 🎉")
        setIsAdding(false)
        setNewProduct({ title: '', price: '', description: '', linksData: '' })
        refreshProducts()
      } else {
        const errData = await response.json()
        alert("GAGAL: " + (errData.error || errData.message))
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan.")
    }
    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return
    const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    if (response.ok) refreshProducts()
  }

  return (
    <>
      <Head><title>Admin Dashboard</title></Head>
      <div className="relative min-h-screen bg-slate-950 text-white">
        <Header cartCount={0} />
        <main className="mx-auto max-w-5xl px-4 py-12">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-black text-cyan-300">Dashboard Admin</h1>
            <button onClick={() => setIsAdding(!isAdding)} className="bg-cyan-400 px-5 py-2 font-bold text-slate-950 rounded-xl">
              {isAdding ? 'Batal' : '+ Tambah Produk'}
            </button>
          </div>

          {isAdding && (
            <motion.form onSubmit={handleAddProduct} className="mb-8 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Nama Produk" className="bg-black/30 px-4 py-3 rounded-xl border border-white/10" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                <input required type="number" placeholder="Harga (Rp)" className="bg-black/30 px-4 py-3 rounded-xl border border-white/10" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input required placeholder="Deskripsi Singkat" className="bg-black/30 px-4 py-3 rounded-xl border border-white/10 sm:col-span-2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                <div className="sm:col-span-2">
                  <label className="text-sm text-cyan-200 mb-2 block">Daftar Link Produk (1 baris = 1 Link/Stok)</label>
                  <textarea required placeholder="https://canva.com/invite/link1...&#10;https://canva.com/invite/link2..." rows="4" className="w-full bg-black/30 px-4 py-3 rounded-xl border border-white/10 font-mono text-sm" value={newProduct.linksData} onChange={e => setNewProduct({...newProduct, linksData: e.target.value})} />
                  <p className="text-xs text-slate-400 mt-2">Stok produk otomatis terhitung dari jumlah baris yang kamu isi di atas.</p>
                </div>
              </div>
              <button disabled={isLoading} type="submit" className="mt-4 w-full bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl">
                {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
              </button>
            </motion.form>
          )}

          <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl p-4">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-slate-400 border-b border-white/10"><th className="pb-3">Produk</th><th className="pb-3">Harga</th><th className="pb-3">Sisa Stok</th><th className="pb-3 text-right">Aksi</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-4">{p.title}</td>
                    <td className="py-4">Rp {p.price}</td>
                    <td className="py-4"><span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold">{p.stock} Link</span></td>
                    <td className="py-4 text-right"><button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 font-bold">Hapus</button></td>
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
