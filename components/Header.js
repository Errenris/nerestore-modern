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
          ? 'bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]'
          : 'text-slate-300 hover:bg-white/10 hover:text-white')
      }
    >
      {children}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="liquid-panel mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] px-4 py-3 md:px-5">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-500 text-lg font-black text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.25)]">
            <span className="absolute inset-x-2 top-1 h-2 rounded-full bg-white/55 blur-sm" />
            N
          </div>
          <div className="leading-tight">
            <div className="text-base font-extrabold tracking-tight text-white">Nerestore</div>
            <div className="text-xs text-cyan-100/60 -mt-0.5">Digital • Bot • Premium</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/15 p-1 backdrop-blur-xl md:flex">
          <NavLink href="/">Shop</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/6289601570287"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-100 shadow-[0_12px_35px_rgba(16,185,129,0.14)] transition hover:-translate-y-0.5 hover:bg-emerald-400/20 sm:inline-flex"
          >
            WhatsApp
          </a>
          <Link
            href="/blog"
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
          >
            Blog
          </Link>
        </div>
      </div>
    </header>
  )
}
