import { strapiAPI } from '#/data'

import { createFileRoute } from '@tanstack/react-router'
import { getCategories, getLinkData } from '#/data/server-functions'
import type { ILink } from '#/types/strapi-types'

export const Route = createFileRoute('/links')({
  loader: () => getCategories(),
  head: () => ({
    meta: [
      { title: 'Links | Notes and Waymarks' },
      {
        name: 'description',
        content:
          'The best links from around the net, hand-picked by the Notes and Waymarks blog.',
      },
      { name: 'robots', content: 'index, follow' },

      // Open Graph (Facebook, LinkedIn, Discord, Slack previews)
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Notes and Waymarks' },
      { property: 'og:title', content: 'Links | Notes and Waymarks' },
      {
        property: 'og:description',
        content: 'The best links from around the net, hand-picked by Notes and Waymarks.',
      },
      { property: 'og:url', content: 'https://notesandwaymarks/links' },
      { property: 'og:image', content: 'https://notesandwaymarks/og-links.png' },

      // Twitter / X
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Links | Notes and Waymarks' },
      {
        name: 'twitter:description',
        content: 'The best links from around the net, hand-picked by Notes and Waymarks.',
      },
      { name: 'twitter:image', content: 'https://notesandwaymarks/og-links.png' },
    ],
    links: [{ rel: 'canonical', href: 'https://notesandwaymarks/links' }],
  }),
  component: RouteComponent,
})


function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="md:pl-2 grid grid-rows-[auto_1fr] md:grid-cols-[1fr_4fr] md:grid-rows-1 h-full mt-5">
      <div className="border-b-2 md:border-r-2 md:border-b-0">
        <div className="sm:mt-4 text-2xl font-albert font-bold bg-primary p-2 w-fit text-on-primary">
          Links
        </div>
        <div>Discover some of my favorite sites</div>
      </div>

      <div className="md:pl-5 flex flex-col md:items-start mx-auto text-center mt-5 md:mt-20 ">
        {data
          .filter((cat) => cat.links?.length)
          .map((cat) => (
            <section key={cat.documentId}>
              <h2 className="text-2xl font-cabin font-bold mb-10">{cat.category}</h2>
              <ul className="flex flex-wrap gap-6 justify-center">
  {cat.links?.map((link) => (
    <li key={link.documentId} className="flex w-80 flex-col items-center">
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="underline font-cabin"
      >
        {link.label}
      </a>

      {link.description && (
        <p className="text-sm line-clamp-3 min-h-15">
          {link.description}
        </p>
      )}

      {link.image && <img
        src={link.image?.formats?.small?.url ?? link.image?.url}
        alt={link.image?.alternativeText ?? link.label}
        className="rounded-2xl shadow-2xl mt-5 mb-10 w-80 h-52 shrink-0 object-cover"
      />}
    </li>
  ))}
</ul>
            </section>
          ))}
      </div>
    </div>
  )
}
