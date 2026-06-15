import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProductCard({ product, onAdd }) {
  const isNumericPrice = String(product.price).match(/^\d+$/)

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
        className="liquid-card group relative h-full overflow-hidden rounded-[2rem] p-4 border-cyan-200/20 shadow-[0_10px_40px_rgba(8,145,178,0.1)] hover:border-cyan-200/50 hover:shadow-[0_30px_90px_rgba(8,145,178,0.3)]"
      >
        {/* Efek Kaca / Cahaya di belakang gambar */}
        <div 
          style={{ transform: "translateZ(-30px)" }} 
          className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-300/20 blur-3xl transition duration-500 group-hover:bg-cyan-300/40" 
        />
        
        <div style={{ transform: "translateZ(20px)" }} className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-slate-950/40 shadow-inner">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={product.image || '/placeholder.png'}
            alt={product.displayTitle || product.title}
            className="h-48 w-full object-cover opacity-90 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-white/10" />
          <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-xl">
            Digital
          </div>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="relative mt-5 flex h-[calc(100%-14rem)] flex-col">
          <h3 className="text-lg font-black leading-snug tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            {product.displayTitle || product.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300/85">{product.description}</p>

          <div className="mt-auto pt-5">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/60">Harga</div>
                {isNumericPrice ? (
                  <div className="mt-1 text-2xl font-black text-white">Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}</div>
                ) : (
                  <div className="mt-1 text-lg font-extrabold text-amber-200">{String(product.price)}</div>
                )}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onAdd(); }}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 px-4 py-3 text-sm font-black text-slate-950 shadow-[0_18px_45px_rgba(56,189,248,0.22)] transition duration-300 hover:shadow-[0_24px_60px_rgba(56,189,248,0.4)]"
            >
              + Tambah ke Keranjang
            </motion.button>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
