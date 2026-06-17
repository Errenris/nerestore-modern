import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProductCard({ product, onAdd }) {
  const isNumericPrice = String(product.price).match(/^\d+$/)

  // LOGIKA BARU: Cek apakah stok habis (0 atau kurang)
  const isOutOfStock = Number(product.stock) <= 0;

  // Setup untuk Efek 3D Tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`liquid-card group relative h-full flex flex-col overflow-hidden rounded-[2rem] p-4 border-cyan-200/20 shadow-[0_10px_40px_rgba(8,145,178,0.1)] hover:shadow-[0_30px_90px_rgba(8,145,178,0.3)] transition-colors duration-300 ${isOutOfStock ? 'hover:border-rose-400/30' : 'hover:border-cyan-200/50'}`}
      >
        {/* Efek Kaca / Cahaya di belakang gambar */}
        <div 
          style={{ transform: "translateZ(-30px)" }} 
          className={`absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl transition duration-500 ${isOutOfStock ? 'bg-rose-500/10 group-hover:bg-rose-500/20' : 'bg-cyan-300/20 group-hover:bg-cyan-300/40'}`} 
        />

        <div style={{ transform: "translateZ(20px)" }} className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-slate-950/40 shadow-inner">
          <motion.img
            whileHover={isOutOfStock ? {} : { scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={product.image || '/placeholder.png'}
            alt={product.title} // <-- SUDAH DIPERBAIKI
            // FOTO JADI GELAP KALAU HABIS
            className={`h-48 w-full object-cover transition duration-300 ${isOutOfStock ? 'opacity-40 grayscale' : 'opacity-90 saturate-125'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-white/10" />

          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-xl">
            Digital
          </div>

          {/* STEMPEL "SOLD OUT" */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-rose-500/80 px-5 py-2 font-black tracking-widest text-white backdrop-blur-md border border-rose-400/50 transform -rotate-12 shadow-2xl">
                SOLD OUT
              </div>
            </div>
          )}
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="relative mt-5 flex h-full flex-col">
          <h3 className={`text-lg font-black leading-snug tracking-tight transition-colors ${isOutOfStock ? 'text-slate-400' : 'text-white group-hover:text-cyan-300'}`}>
            {product.title} {/* <-- INI KUNCI UTAMANYA: Mengambil nama murni dari database */}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300/85">{product.description}</p>

          <div className="mt-auto pt-5">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/60">Harga</div>
                {isNumericPrice ? (
                  <div className={`mt-1 text-2xl font-black ${isOutOfStock ? 'text-slate-400' : 'text-white'}`}>Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}</div>
                ) : (
                  <div className={`mt-1 text-lg font-extrabold ${isOutOfStock ? 'text-slate-400' : 'text-amber-200'}`}>{String(product.price)}</div>
                )}
              </div>

              {/* TAMPILAN SISA STOK */}
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/60">Sisa Stok</div>
                <div className={`mt-1 text-xl font-black ${isOutOfStock ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isOutOfStock ? '0' : product.stock}
                </div>
              </div>
            </div>

            <motion.button
              whileTap={isOutOfStock ? {} : { scale: 0.95 }}
              onClick={(e) => { 
                e.stopPropagation(); 
                // Matikan klik kalau habis
                if (!isOutOfStock) onAdd(); 
              }}
              disabled={isOutOfStock}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-black transition duration-300
                ${isOutOfStock 
                  ? 'bg-slate-800/50 text-slate-500 border border-white/5 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 text-slate-950 shadow-[0_18px_45px_rgba(56,189,248,0.22)] hover:shadow-[0_24px_60px_rgba(56,189,248,0.4)]'
                }
              `}
            >
              {isOutOfStock ? 'Stok Kosong' : '+ Tambah ke Keranjang'}
            </motion.button>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
