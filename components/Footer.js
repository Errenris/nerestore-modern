import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-white font-semibold">Nerestore</div>
            <p className="mt-2 text-sm text-gray-400">
              Website resmi Nerestore untuk informasi, tutorial, dan layanan digital.
            </p>
            <p className="mt-4 text-xs text-gray-500">© {year} Nerestore. All rights reserved.</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Menu</div>
            <div className="mt-3 grid gap-2 text-sm">
              <Link className="text-gray-300 hover:text-white" href="/">Shop</Link>
              <Link className="text-gray-300 hover:text-white" href="/blog">Blog</Link>
              <Link className="text-gray-300 hover:text-white" href="/about">About</Link>
              <Link className="text-gray-300 hover:text-white" href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Legal</div>
            <div className="mt-3 grid gap-2 text-sm">
              <Link className="text-gray-300 hover:text-white" href="/privacy">Privacy Policy</Link>
              <Link className="text-gray-300 hover:text-white" href="/terms">Terms</Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Catatan: gunakan layanan/produk sesuai ketentuan platform terkait.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
