import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer'
import { Link } from '@tanstack/react-router'

export function RichTextRenderer({ data }: { data: BlocksContent }) {
  return (
    <BlocksRenderer
      content={data}
      blocks={{
        paragraph: ({ children }) => <p className="text-neutral-900 max-w-prose">{children}</p>,
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="font-albert text-3xl font-bold mt-6 mb-3">{children}</h1>
            case 2:
              return <h2 className="font-albert text-2xl font-bold mt-5 mb-2">{children}</h2>
            case 3:
              return <h3 className="font-albert text-xl font-bold mt-4 mb-2">{children}</h3>
            case 4:
              return <h4 className="font-albert text-lg font-bold mt-3 mb-1">{children}</h4>
            case 5:
              return <h5 className="font-albert text-base font-bold mt-2 mb-1">{children}</h5>
            case 6:
              return <h6 className="font-albert text-sm font-bold mt-2 mb-1">{children}</h6>
            default:
              return <h1 className="font-albert text-3xl font-bold mt-6 mb-3">{children}</h1>
          }
        },
        link: ({ children, url }) => <Link to={url}>{children}</Link>,
      }}
      modifiers={{
        bold: ({ children }) => <strong className="font-cabin">{children}</strong>,
        italic: ({ children }) => <span className="italic">{children}</span>,
        code: ({ children }) => (
          <code className="bg-primary text-black px-1.5 py-0.5 rounded text-lg font-mono">
            {children}
          </code>
        ),
      }}
    />
  )
}