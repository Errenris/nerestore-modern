import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AdminDashboard() {
  // === STATE UNTUK KEAMANAN LOGIN ===
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')

  // === STATE UNTUK PRODUK ===
  const [products, setProducts] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ id: '', title: '', price: '', description: '', linksData: '' })

  // Cek apakah sebelumnya sudah login
  useEffect(() => { 
    if (sessionStorage.getItem('nerestore_admin') === 'akses_diberikan') {
      setIsAuthenticated(true)
      refreshProducts()
    }
  }, [])

  // Fungsi Proses Login (Aman pakai API Backend)
  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      })
      
      const data = await res.json()
      
      if (res.ok && data.success) { 
        sessionStorage.setItem('nerestore_admin', 'akses_diberikan')
        setIsAuthenticated(true)
        refreshProducts()
      } else {
        alert('🚨 AKSES DITOLAK: ' + data.message)
        setPasswordInput('')
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan saat login.")
    }
  }

  // Fungsi Keluar (Logout)
  const handleLogout = () => {
    sessionStorage.removeItem('nerestore_admin')
    setIsAuthenticated(false)
    setProducts([])
  }

  // Ambil data produk (pakai ?admin=true biar link rahasia kelihatan di panel)
  const refreshProducts = () => {
    fetch('/api/products?admin=true').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setProducts(data)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const method = isEditing ? 'PUT' : 'POST'
      const response = await fetch('/api/products', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (response.ok) {
        alert(isEditing ? "Produk berhasil diperbarui! 🎉" : "Produk & Antrean Link berhasil disimpan! 🎉")
        cancelForm()
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

  const startEdit = (p) => {
    setIsEditing(true)
    setIsAdding(false)
    setForm({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      linksData: p.links ? p.links.join('\n') : '' 
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return
    const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    if (response.ok) refreshProducts()
  }

  const cancelForm = () => {
    setIsAdding(false)
    setIsEditing(false)
    setForm({ id: '', title: '', price: '', description: '', linksData: '' })
  }

  // =========================================================
  // TAMPILAN JIKA BELUM LOGIN (HALAMAN GEMBOK)
  // =========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Head><title>Admin Login</title></Head>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
              <span className="text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl font-black text-white">Area Terbatas</h1>
            <p className="text-slate-400 text-sm mt-1">Silakan masukkan password admin.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              required 
              autoFocus
              placeholder="Masukkan Password..." 
              className="w-full bg-black/50 px-5 py-4 rounded-xl border border-white/10 text-white text-center tracking-widest focus:border-cyan-400 focus:outline-none transition"
              value={passwordInput} 
              onChange={e => setPasswordInput(e.target.value)} 
            />
            <button type="submit" className="w-full bg-cyan-400 text-slate-950 font-black py-4 rounded-xl hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              BUKA KUNCI
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // =========================================================
  // TAMPILAN DASHBOARD ADMIN (JIKA PASSWORD BENAR)
  // =========================================================
  return (
    <>
      <Head><title>Admin Dashboard</title></Head>
      <div className="relative min-h-screen bg-slate-950 text-white">
        <Header cartCount={0} />
        <main className="mx-auto max-w-5xl px-4 py-12">
          
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-cyan-300">Dashboard Admin</h1>
              <p className="text-sm text-slate-400 mt-1">Pusat kontrol stok & produk digital.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { setIsAdding(true); setIsEditing(false); setForm({ id: '', title: '', price: '', description: '', linksData: '' }); }} 
                className="bg-cyan-400 px-5 py-2 font-bold text-slate-950 rounded-xl hover:bg-cyan-300 transition"
              >
                + Tambah Produk
              </button>
              <button onClick={handleLogout} className="bg-rose-500/20 text-rose-400 px-5 py-2 font-bold rounded-xl hover:bg-rose-500/30 border border-rose-500/30 transition">
                Logout 🔒
              </button>
            </div>
          </div>

          {(isAdding || isEditing) && (
            <motion.form initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="mb-8 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-200">{isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                <button type="button" onClick={cancelForm} className="text-sm text-slate-400 hover:text-white transition">Batal ✕</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Nama Produk" className="bg-black/30 px-4 py-3 rounded-xl border border-white/10" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                <input required type="number" placeholder="Harga (Rp)" className="bg-black/30 px-4 py-3 rounded-xl border border-white/10" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                <input required placeholder="Deskripsi Singkat" className="bg-black/30 px-4 py-3 rounded-xl border border-white/10 sm:col-span-2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <div className="sm:col-span-2">
                  <label className="text-sm text-cyan-200 mb-2 block">Daftar Link Akses / Produk Digital (1 baris = 1 Link/Stok)</label>
                  <textarea required placeholder="https://canva.com/invite/link1...&#10;https://canva.com/invite/link2..." rows="8" className="w-full bg-black/30 px-4 py-3 rounded-xl border border-white/10 font-mono text-sm leading-relaxed whitespace-pre-wrap" value={form.linksData} onChange={e => setForm({...form, linksData: e.target.value})} />
                  <p className="text-xs text-slate-400 mt-2">Sisa stok produk saat ini bisa dilihat dari jumlah baris link di kotak atas.</p>
                </div>
              </div>
              <button disabled={isLoading} type="submit" className="mt-5 w-full bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl hover:bg-cyan-300 transition">
                {isLoading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Simpan Produk')}
              </button>
            </motion.form>
          )}

          <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl p-4">
            <table className="w-full text-left text-sm">
              <thead><tr className="text-slate-400 border-b border-white/10"><th className="pb-3">Produk</th><th className="pb-3">Harga</th><th className="pb-3">Sisa Stok</th><th className="pb-3 text-right">Aksi</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-4 font-semibold">{p.title}</td>
                    <td className="py-4">Rp {new Intl.NumberFormat('id-ID').format(Number(p.price))}</td>
                    <td className="py-4"><span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold">{p.stock} Link</span></td>
                    <td className="py-4 text-right">
                      <button onClick={() => startEdit(p)} className="text-cyan-400 hover:text-cyan-300 font-bold mr-5 transition">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 font-bold transition">Hapus</button>
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
