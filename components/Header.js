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

      }
    >
      {children}
    </Link>
  )

  return (

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

        </div>
      </div>
    </header>
  )
}
