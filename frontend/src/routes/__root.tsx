import { HeadContent, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

//Custom components
import Header from '#/components/header'
import Footer from '#/components/footer'

//Api calls
import { getHeaderData, getFooterData, getSiteSettings, getPostsData} from '#/data/server-functions'


export const Route = createRootRoute({
  
  loader: async () => {
    const [header, footer, siteSettings, posts] = await Promise.all(
      [
        getHeaderData(),
        getFooterData(),
        getSiteSettings(),
        getPostsData()
      ])
    return {
      header: header.data, 
      footer: footer.data, 
      siteSettings:siteSettings.data, 
      posts:posts.data
    }
  },
  
  
  
  
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold font-albert">404</h1>
      <p className="font-cabin text-gray-500 italic mt-2">
        Sorry, that page doesn't exist.
      </p>
      <Link to="/" className="mt-4 underline">
        Back home
      </Link>
    </div>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="min-h-screen w-full max-w-7xl mx-auto grid grid-rows-[auto_1fr_auto]">
          <Header />
          {children}
          <Footer />
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        
        <Scripts />
      </body>
    </html>
  )
}
