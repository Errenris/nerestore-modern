import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-slate-950/30 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="liquid-glass rounded-[2rem] p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/10 font-black text-white">N</div>
                <div>
                  <div className="font-black text-white">Nerestore</div>
                  <div className="text-xs text-cyan-100/60">Digital store modern</div>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Website resmi Nerestore untuk informasi, tutorial, dan layanan digital dengan pengalaman checkout yang ringkas.
              </p>
              <p className="mt-5 text-xs text-slate-500">© {year} Nerestore. All rights reserved.</p>
            </div>

            <div>
              <div className="text-sm font-black uppercase tracking-[0.22em] text-cyan-100/60">Menu</div>
              <div className="mt-4 grid gap-3 text-sm font-semibold">
                <Link className="text-slate-300 transition hover:text-white" href="/">Shop</Link>
                <Link className="text-slate-300 transition hover:text-white" href="/blog">Blog</Link>
                <Link className="text-slate-300 transition hover:text-white" href="/about">About</Link>
                <Link className="text-slate-300 transition hover:text-white" href="/contact">Contact</Link>
              </div>
            </div>

            <div>
              <div className="text-sm font-black uppercase tracking-[0.22em] text-cyan-100/60">Legal</div>
              <div className="mt-4 grid gap-3 text-sm font-semibold">
                <Link className="text-slate-300 transition hover:text-white" href="/privacy">Privacy Policy</Link>
                <Link className="text-slate-300 transition hover:text-white" href="/terms">Terms</Link>
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-500">
                Gunakan layanan/produk sesuai ketentuan platform terkait.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
