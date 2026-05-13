import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { getAllPosts } from '../../data/posts'
import { useState } from 'react'

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } }
}

export default function Blog({ posts }) {
  const [search, setSearch] = useState('')

  const filteredPosts = posts.filter((p) => {
  const q = search.toLowerCase()

  return (
    (p.title || '').toLowerCase().includes(q) ||
    (p.excerpt || '').toLowerCase().includes(q) ||
    ((p.tags || []).join(' ').toLowerCase().includes(q))
  )
})

  const handleWebSearch = () => {
    if (!search.trim()) return

    const query = encodeURIComponent(`site:nerestore.vercel.app ${search}`)
    window.open(`https://www.google.com/search?q=${query}`, '_blank')
  }

  return (
    <>
      <Head>
        <title>Blog — Nerestore</title>
        <meta
          name="description"
          content="Tutorial desain, tools kreator, dan tips yang aman untuk AdSense."
        />
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

        {/* Search */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Cari tutorial, tools, resource..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleWebSearch()
            }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-white/20"
          />

          <button
  onClick={handleWebSearch}
  className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/15"
>
  Cari Web
</button>
