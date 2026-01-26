export const posts = [
  {
    slug: 'cara-desain-poster-jualan',
    title: 'Cara Desain Poster Jualan yang Cepat Laku (Template + Tips)',
    excerpt: 'Struktur headline, warna, dan CTA yang bikin poster kamu lebih “nendang” di WhatsApp & TikTok.',
    date: '2026-01-26',
    readingTime: '5 menit',
    tags: ['Desain', 'Marketing'],
    content: `
## Ringkasnya
Poster jualan yang bagus itu simpel: **headline jelas**, **benefit singkat**, dan **CTA tegas**.

### 1) Headline satu kalimat
Contoh: **“Canva Template Siap Pakai”** / **“Jasa Desain Cepat”**.

### 2) 3 benefit utama
Gunakan bullet, jangan paragraf panjang.

### 3) CTA yang jelas
Tulis: **Chat WhatsApp** / **Klik tombol order**.

### 4) Jangan terlalu ramai
Sisakan whitespace supaya terlihat premium.

Kalau kamu mau, Nerestore bisa bantu buat template yang tinggal edit.
    `
  },
  {
    slug: 'cek-list-website-adsense',
    title: 'Checklist Website Biar Lolos Google AdSense',
    excerpt: 'Halaman wajib, struktur menu, dan konten yang sering bikin approve lebih cepat.',
    date: '2026-01-26',
    readingTime: '6 menit',
    tags: ['AdSense', 'SEO'],
    content: `
## Checklist wajib
- **Privacy Policy**
- **About**
- **Contact**
- Konten original (minimal 10–20 artikel)
- Navigasi jelas, mobile-friendly

## Konten yang aman
Fokus pada tutorial, studi kasus, dan resource legal (template buatan sendiri).

## Struktur rekomendasi
- /blog
- /about, /contact, /privacy, /terms
- / (opsional untuk shop, tapi iklan sebaiknya hanya di blog)
    `
  },
  {
    slug: 'tools-gratis-untuk-kreator',
    title: '7 Tools Gratis untuk Kreator: Desain, Kompres Video, sampai Link-in-bio',
    excerpt: 'Pilihan tools legal & gratis yang bisa bantu konten kamu makin rapi dan cepat produksi.',
    date: '2026-01-26',
    readingTime: '7 menit',
    tags: ['Tools', 'Creator'],
    content: `
## 7 Tools gratis yang kepake
1. Kompres gambar (online)
2. Kompres video (desktop / web)
3. Remove background (opsi gratis)
4. Font pairing
5. Color palette generator
6. Link-in-bio page
7. Scheduler posting (opsi free)

Pilih yang sesuai kebutuhan dan pastikan sumbernya legal ya.
    `
  }
]

export function getAllPosts() {
  return posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug)
}
