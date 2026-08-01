import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

//Custom components
import Header from '#/components/header'
import Footer from '#/components/footer'

//Api calls
import { getHeaderData, getFooterData} from '#/data/server-functions'


export const Route = createRootRoute({
  
  loader: async () => {
    const [header, footer] = await Promise.all(
      [
        getHeaderData(),
        getFooterData()
      ])
    return {header: header.data, footer: footer.data}
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
