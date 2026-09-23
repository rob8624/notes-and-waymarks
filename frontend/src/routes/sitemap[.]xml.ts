import { createFileRoute } from '@tanstack/react-router'
import { getAllPostSlugsData } from '#/data/server-functions'

const SITE_URL = 'https://www.notesandwaymarks.com'

type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: string
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const response = await getAllPostSlugsData()
        const posts = response.data ?? []

        const staticUrls: SitemapUrl[] = [
          { loc: `${SITE_URL}/`, changefreq: 'daily', priority: '1.0' },
        ]

        const postUrls: SitemapUrl[] = posts.map((post) => ({
          loc: `${SITE_URL}/posts/${post.slug}`,
          lastmod: post.updatedAt,
          changefreq: 'weekly',
        }))

        const allUrls: SitemapUrl[] = [...staticUrls, ...postUrls]

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    ${u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : ''}
    ${u.priority ? `<priority>${u.priority}</priority>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>`

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        })
      },
    },
  },
})