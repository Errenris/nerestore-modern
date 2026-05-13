import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="px-4 pb-6 md:px-6">
      <div className="liquid-panel mx-auto max-w-7xl rounded-[2rem] px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-2xl font-black text-white">Nerestore</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300/75">
              Website resmi untuk informasi, tutorial, bot, akun premium, dan layanan digital dengan pengalaman belanja modern.
            </p>
            <p className="mt-5 text-xs text-slate-500">© {year} Nerestore. All rights reserved.</p>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100/60">Menu</div>
            <div className="mt-4 grid gap-2 text-sm font-semibold">
              <Link className="text-slate-300 transition hover:text-white" href="/">Shop</Link>
              <Link className="text-slate-300 transition hover:text-white" href="/blog">Blog</Link>
              <Link className="text-slate-300 transition hover:text-white" href="/about">About</Link>
              <Link className="text-slate-300 transition hover:text-white" href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100/60">Legal</div>
            <div className="mt-4 grid gap-2 text-sm font-semibold">
              <Link className="text-slate-300 transition hover:text-white" href="/privacy">Privacy Policy</Link>
              <Link className="text-slate-300 transition hover:text-white" href="/terms">Terms</Link>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Gunakan layanan/produk sesuai ketentuan platform terkait.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
