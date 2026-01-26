import { getAllPosts } from '../data/posts'

const SITE_URL = 'https://nerestoree.vercel.app'

function xmlUrl(loc) {
  return `<url><loc>${loc}</loc></url>`
}

export async function getServerSideProps({ res }) {
  const staticPages = ['', '/blog', '/about', '/contact', '/privacy', '/terms']
  const posts = getAllPosts().map((p) => `/blog/${p.slug}`)

  const urls = [...staticPages, ...posts].map((p) => xmlUrl(`${SITE_URL}${p}`)).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
