function daysAgo(days) {
  const d = new Date()

  d.setDate(d.getDate() - days)

  return d.toISOString().split('T')[0]
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200

  const words = content.trim().split(/\s+/).length

  const minutes = Math.ceil(words / wordsPerMinute)

  return `${minutes} menit`
}

export const posts = [
  {
    slug: 'cara-desain-poster-jualan',

    title:
      'Cara Desain Poster Jualan yang Cepat Laku (Template + Tips)',

    excerpt:
      'Struktur headline, warna, dan CTA yang bikin poster kamu lebih menarik di WhatsApp & TikTok.',

    date: daysAgo(0),

    tags: ['Desain', 'Marketing'],

    content: `
## Ringkasnya
Poster jualan yang bagus itu simpel:
- headline jelas
- benefit singkat
- CTA tegas

### Tips penting
Gunakan warna kontras dan hindari terlalu banyak font.

### CTA
Gunakan CTA seperti:
- Chat Sekarang
- Order Hari Ini
- Klik WhatsApp

### Bonus
Tambahkan testimoni singkat supaya lebih trusted.
    `,
  },

  {
    slug: 'cek-list-website-adsense',

    title: 'Checklist Website Biar Lolos Google AdSense',

    excerpt:
      'Halaman wajib, struktur menu, dan konten yang sering bikin approve lebih cepat.',

    date: daysAgo(1),

    tags: ['AdSense', 'SEO'],

    content: `
## Checklist wajib
- Privacy Policy
- About
- Contact
- Konten original
- Navigasi jelas

## Struktur aman
Gunakan struktur blog yang rapi dan mobile-friendly.

## Tips tambahan
Hindari konten copy paste dan keyword stuffing.
    `,
  },

  {
    slug: 'tools-gratis-untuk-kreator',

    title:
      '7 Tools Gratis untuk Kreator: Desain, Kompres Video, sampai Link-in-bio',

    excerpt:
      'Pilihan tools legal & gratis yang bisa bantu konten kamu makin rapi dan cepat produksi.',

    date: daysAgo(2),

    tags: ['Tools', 'Creator'],

    content: `
## Tools rekomendasi
1. Canva
2. Remove.bg
3. TinyPNG
4. CapCut
5. Coolors
6. Notion
7. Linktree

## Tips
Gunakan tools sesuai kebutuhan dan cek lisensinya.
    `,
  },

  {
    slug: 'cara-bikin-link-bio-keren',

    title:
      'Cara Bikin Link in Bio yang Minimalis dan Profesional',

    excerpt:
      'Bikin halaman link sederhana tapi premium untuk TikTok, Instagram, dan WhatsApp.',

    date: daysAgo(3),

    tags: ['Creator', 'Branding'],

    content: `
## Kenapa penting?
Link bio membantu semua link penting jadi satu halaman.

## Isi wajib
- Foto/logo
- Deskripsi singkat
- Tombol CTA
- Sosial media

## Bonus
Tambahkan warna brand supaya lebih profesional.
    `,
  },

  {
    slug: 'cara-mempercepat-website-nextjs',

    title:
      'Cara Mempercepat Website Next.js Biar Loading Ngebut',

    excerpt:
      'Optimasi gambar, lazy loading, dan struktur sederhana untuk skor PageSpeed lebih bagus.',

    date: daysAgo(4),

    tags: ['NextJS', 'Performance'],

    content: `
## Optimasi utama
- Gunakan next/image
- Compress image
- Hindari script berlebihan
- Gunakan caching

## Bonus
Deploy di Vercel supaya CDN otomatis aktif.
    `,
  },

  {
    slug: 'warna-yang-bikin-desain-premium',

    title:
      'Kombinasi Warna yang Bikin Desain Terlihat Premium',

    excerpt:
      'Pilihan warna dark modern yang cocok untuk landing page, toko digital, dan portfolio.',

    date: daysAgo(5),

    tags: ['Desain', 'UI'],

    content: `
## Warna populer
- Hitam + putih
- Navy + cyan
- Dark gray + emerald

## Tips
Gunakan maksimal 2-3 warna utama.
    `,
  },

  {
    slug: 'cara-menulis-artikel-seo',

    title:
      'Cara Menulis Artikel SEO yang Tetap Enak Dibaca',

    excerpt:
      'Strategi heading, keyword, dan struktur artikel supaya ranking tanpa terasa spam.',

    date: daysAgo(6),

    tags: ['SEO', 'Writing'],

    content: `
## Struktur artikel SEO
- Judul jelas
- Heading rapi
- Internal link
- Keyword natural

## Hindari
Keyword stuffing dan paragraf terlalu panjang.
    `,
  },

  {
    slug: 'template-landing-page-gratis',

    title:
      'Template Landing Page Gratis untuk Jualan Digital Product',

    excerpt:
      'Landing page simpel dengan CTA yang cocok untuk jual template, preset, dan ebook.',

    date: daysAgo(7),

    tags: ['Landing Page', 'Marketing'],

    content: `
## Bagian penting
- Hero section
- Benefit
- Testimoni
- CTA

## Tips
Fokus ke satu tujuan utama.
    `,
  },

  {
    slug: 'cara-branding-toko-online',

    title:
      'Cara Branding Toko Online Supaya Terlihat Lebih Trusted',

    excerpt:
      'Hal kecil yang bikin toko digital terlihat lebih profesional dan dipercaya pembeli.',

    date: daysAgo(8),

    tags: ['Branding', 'Bisnis'],

    content: `
## Yang paling penting
- Logo konsisten
- Warna brand
- Testimoni
- Tampilan rapi

## Bonus
Gunakan domain sendiri supaya lebih profesional.
    `,
  },

  {
    slug: 'cara-bikin-thumbnail-youtube',

    title:
      'Cara Bikin Thumbnail YouTube yang CTR-nya Tinggi',

    excerpt:
      'Teknik warna, teks, dan komposisi supaya thumbnail lebih menarik diklik.',

    date: daysAgo(9),

    tags: ['YouTube', 'Desain'],

    content: `
## Formula thumbnail
- Fokus 1 objek
- Teks besar
- Kontras tinggi
- Ekspresi jelas

## Hindari
Terlalu banyak tulisan kecil.
    `,
  },

  {
    slug: 'website-gratis-untuk-font',

    title:
      'Website Gratis untuk Cari Font Estetik dan Legal',

    excerpt:
      'Rekomendasi situs font gratis yang aman dipakai untuk desain komersial.',

    date: daysAgo(10),

    tags: ['Font', 'Tools'],

    content: `
## Rekomendasi
- Google Fonts
- Fontshare
- DaFont
- Adobe Fonts

## Tips
Selalu cek lisensi sebelum dipakai komersial.
    `,
  },

  {
    slug: 'cara-mendapatkan-traffic-organik',

    title:
      'Cara Mendapatkan Traffic Organik Tanpa Iklan',

    excerpt:
      'Strategi konten evergreen untuk mendatangkan pengunjung stabil dari Google.',

    date: daysAgo(11),

    tags: ['SEO', 'Traffic'],

    content: `
## Fokus utama
- Artikel evergreen
- Internal link
- Keyword long-tail
- Konsisten upload

## Jangan lupa
Optimasi mobile dan kecepatan website.
    `,
  },
].map((post) => ({
  ...post,
  readingTime: calculateReadingTime(post.content),
}))

export function getAllPosts() {
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug)
}
