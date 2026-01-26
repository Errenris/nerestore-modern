export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl transition hover:bg-white/10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.displayTitle || product.title}
          className="h-44 w-full object-cover opacity-90 transition group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-200 backdrop-blur">
          Digital item
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-base font-bold text-white">
          {product.displayTitle || product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-300">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            {String(product.price).match(/^\d+$/) ? (
              <div className="text-white font-extrabold">Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}</div>
            ) : (
              <div className="text-amber-200 font-semibold">{String(product.price)}</div>
            )}
            <div className="text-xs text-gray-500">Garansi sesuai ketentuan</div>
          </div>

          <button
            onClick={onAdd}
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  )
}
