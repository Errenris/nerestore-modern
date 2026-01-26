import Link from 'next/link'
import { useRouter } from 'next/router'
export default function Header() {
const router = useRouter()
const isActive = (href) => router.pathname === href || router.pathname.startsWith(href + '/')
const NavLink = ({ href, children }) => (
<Link

  href={href}

  className={

    'text-sm font-medium transition ' +

    (isActive(href) ? 'text-white' : 'text-gray-300 hover:text-white')

  }

>

  {children}

</Link>

)
return (
<header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">

  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">

    <Link href="/" className="flex items-center gap-3">

      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-amber-400 text-black font-extrabold">

        N

      </div>

      <div className="leading-tight">

        <div className="text-base font-semibold text-white">Nerestore</div>

        <div className="text-xs text-gray-400 -mt-0.5">Digital • Tools • Template</div>

      </div>

    </Link>



    <nav className="hidden items-center gap-6 md:flex">

      <NavLink href="/">Shop</NavLink>

      <NavLink href="/blog">Blog</NavLink>

      <NavLink href="/about">About</NavLink>

      <NavLink href="/contact">Contact</NavLink>

    </nav>



    <div className="flex items-center gap-3">

      <Link

        href="/blog"

        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 transition"

      >

        Baca Blog

      </Link>

    </div>

  </div>

</header>

)
}
Ubah kan biar langsung copy paste
