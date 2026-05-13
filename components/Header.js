import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const isActive = (href) => router.pathname === href || router.pathname.startsWith(href + '/')
  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className={
        'rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ' +
        (isActive(href)
          ? 'bg-white text-slate-950 shadow-lg shadow-cyan-500/20'
          : 'text-white/70 hover:bg-white/10 hover:text-white')
      }
    >
      {children}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/10 font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_45px_rgba(34,211,238,0.18)] backdrop-blur-xl transition group-hover:scale-105">
            <span className="bg-gradient-to-br from-cyan-200 via-white to-violet-200 bg-clip-text text-transparent">N</span>
          </div>
          <div className="leading-tight">
            <div className="text-base font-black tracking-tight text-white">Nerestore</div>
            <div className="-mt-0.5 text-xs text-cyan-100/60">Digital • Bot • Premium</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl md:flex">
          <NavLink href="/">Shop</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/blog" className="glass-button hidden px-4 py-2 md:inline-flex">
            Baca Blog
          </Link>
          <a
            href="https://wa.me/6289601570287"
            target="_blank"
            rel="noreferrer"
            className="gradient-button px-4 py-2"
          >
            Chat WA
          </a>
        </div>
      </div>
    </header>
  )
}
