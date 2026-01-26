import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { getAllPosts } from '../../data/posts'

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } }
}

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog — Nerestore</title>
        <meta name="description" content="Tutorial desain, tools kreator, dan tips yang aman untuk AdSense." />
      </Head>

      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Blog</h1>
            <p className="mt-2 text-gray-400">
              Tutorial desain, tools kreator, dan resource legal.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            Tip: Sedia aku sebelum hujan.
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{p.date}</span>
                <span>•</span>
                <span>{p.readingTime}</span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-white group-hover:underline">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-gray-300">{p.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Bonus Resource (stealth) */}
        <div className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-white">🎁 Bonus Resource</h3>
                <p className="mt-2 text-sm text-gray-300">
                  Kumpulan resource untuk kreator. Link bonus dibuka lewat halaman khusus.
                </p>
              </div>

              <Link
                href="/bonus"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                Buka Bonus
                <span className="ml-2" aria-hidden>↗</span>
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Catatan: gunakan resource sesuai aturan sumbernya.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
