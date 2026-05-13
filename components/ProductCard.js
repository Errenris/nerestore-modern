function formatIDR(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return new Intl.NumberFormat('id-ID').format(num)
}

export default function ProductCard({ product, onAdd }) {
  const title = product.displayTitle || product.title
  const priceIsNumber = String(product.price).match(/^\d+$/)

  return (
    <article className="group liquid-glass h-full rounded-[2rem] p-4 transition duration-500 hover:-translate-y-2 hover:border-cyan-200/50 hover:shadow-[0_34px_90px_rgba(34,211,238,0.18)]">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/50">
        <img
          src={product.image || '/placeholder.png'}
          alt={title}
          className="h-48 w-full object-cover opacity-90 saturate-125 transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-xl">
          Instant
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 backdrop-blur-xl">
          <span className="text-xs font-semibold text-white/75">Digital item</span>
          <span className="text-xs font-bold text-emerald-200">Garansi</span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <h3 className="text-lg font-black leading-snug text-white">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">{product.description}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/55">Harga</div>
              {priceIsNumber ? (
                <div className="mt-1 text-2xl font-black text-white">Rp {formatIDR(product.price)}</div>
              ) : (
                <div className="mt-1 text-lg font-bold text-amber-200">{String(product.price)}</div>
              )}
            </div>
            <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
              Ready
            </div>
          </div>

          <button
            onClick={onAdd}
            className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-100"
          >
            + Masukkan Keranjang
          </button>
        </div>
      </div>
    </article>
  )
}
