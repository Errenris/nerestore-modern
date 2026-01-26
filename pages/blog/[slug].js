import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../data/posts'

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  return { props: { post } }
}

function mdToHtml(md) {
  // super-light markdown renderer (headings + lists + paragraphs)
  const lines = md.trim().split('\n')
  const html = []
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim()
    if (!l) continue
    if (l.startsWith('### ')) html.push(`<h3 class="mt-6 text-lg font-semibold text-white">${escapeHtml(l.slice(4))}</h3>`)
    else if (l.startsWith('## ')) html.push(`<h2 class="mt-8 text-xl font-semibold text-white">${escapeHtml(l.slice(3))}</h2>`)
    else if (l.startsWith('# ')) html.push(`<h1 class="mt-8 text-2xl font-semibold text-white">${escapeHtml(l.slice(2))}</h1>`)
    else if (l.startsWith('- ') || l.startsWith('• ')) {
      const items = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('• '))) {
        items.push(`<li class="text-gray-300">${escapeHtml(lines[i].trim().slice(2))}</li>`)
        i++
      }
      i--
      html.push(`<ul class="mt-3 list-disc pl-5 space-y-2">${items.join('')}</ul>`)
    } else {
      html.push(`<p class="mt-3 text-gray-300 leading-relaxed">${escapeHtml(l)}</p>`)
    }
  }
  return html.join('')
}

function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} — Nerestore</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <Header />

      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-white">← Kembali ke Blog</Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold text-white">{post.title}</h1>
          <p className="mt-3 text-gray-300">{post.excerpt}</p>

          {/* Slot iklan (opsional) — pasang AdSense di sini setelah approved */}
          {/* <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-6 text-sm text-gray-400">
            Ad slot
          </div> */}

          <article
            className="prose prose-invert mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: mdToHtml(post.content) }}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
