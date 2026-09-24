import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { getPostDetail } from '#/data/server-functions'
import { BlockRenderer } from '#/components/blockRenderer'
import {  z } from 'zod'
import { PostSideBar } from '#/components/postSideBar'
import { LightBoxProvider } from '#/context/lightboxContext'
import type { IStrapiMedia } from '#/types/strapi-types'
import { Lightbox } from '#/components/lightBox'


const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)




export const Route = createFileRoute(`/posts/$postSlug`)({
   params: {
    parse: (params) => ({
      postSlug: slugSchema.parse(params.postSlug),
    }),
  },
  loader: async ({ params }) => {
    const slug = params.postSlug
    const post = await getPostDetail({ data: { slug: slug } })

    

    return { post }
  },
  head: ({ loaderData }) => {
    const postData = loaderData?.post?.data?.[0]
    if (!postData) return {}

    const seo = postData.seo
    const title = seo?.metaTitle ?? postData.title
    const description = seo?.metaDescription ?? postData.summary
    const image = seo?.shareImage?.url ?? postData.featuredImage?.url

    const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.summary,
    image: image ? [image] : undefined,
    datePublished: postData.createdAt,
    dateModified: postData.updatedAt,
    author: postData.author
      ? {
          '@type': 'Person',
          name: postData.author.name,
        }
      : undefined,
  }

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image }, 
        ...(seo?.noIndex ? [{ name: 'robots', content: 'noindex' }] : []),
      ],
      links: seo?.canonicalUrl
        ? [{ rel: 'canonical', href: seo.canonicalUrl }]
        : [],
         scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd),
      },
    ],
    }
  },

  component: RouteComponent,
})

function RouteComponent() {

 const { post } = Route.useLoaderData()
 const postData = post.data[0]
  
 if (!postData) {
    return <div>Post not found</div>
  }


 
const getGalleryImages = (): Array<IStrapiMedia> => {
  const images: Array<IStrapiMedia> = []
  const seenIds = new Set<number>()

  const addImage = (image: IStrapiMedia, customCaption?: string | null ) => {
    if (!seenIds.has(image.id)) {
      seenIds.add(image.id)
      images.push({...image, caption: customCaption ?? null })
    }
  }

  for (const block of postData.content) {
    if (block.__component === 'blocks.image') {
      addImage(block.singleImage.image, block.singleImage.imageCaption?.caption)
    }

    if (block.__component === 'blocks.multiple-images') {
      block.images.forEach((img) => addImage(img))
    }
  }

  return images
}

  const galleryImages = getGalleryImages()
 
 
 if (!postData) {
    return <div>Post not found</div>
  }

 
  return (
  <div className="mt-10 flex flex-col gap-2 lg:grid lg:grid-cols-[20%_1fr] lg:grid-rows-[auto_1fr]">
    {/* Mobile category */}
    <div className="order-1 block w-fit p-1 text-xs uppercase text-primary lg:hidden">
      <div className='flex gap-2 flex-wrap'>
      {postData.categories.map((item) => <div className='text-on-primary bg-primary p-1 '>{item.name}</div>)}
      </div>
    </div>

    {/* Title */}
    <div className="order-2 flex flex-col items-center lg:col-start-2 lg:row-start-1">
      <h1 className="text-center font-cabin text-4xl tracking-tight lg:text-5xl pt-5 font-bold">
        {postData.title}
      </h1>

      <div className="mt-3 text-center font-albert text-lg tracking-tight mb-10 text-gray-600">
        {postData.summary}
      </div>
      { postData.featuredImage ? <img src={postData.featuredImage.formats?.medium?.url} alt={postData.featuredImage.alternativeText && ' '} />
      : ''}
    </div>

    {/* Sidebar */}
    <PostSideBar
      author={postData.author}
      publishedDate={postData.createdAt}
      updatedDate={postData.updatedAt}
      categories={postData.categories}
      className="
        order-3
        lg:col-start-1
        lg:row-span-2
        lg:row-start-1
        lg:border-r-2
        lg:p-4
      "
    />

    {/* Article */}
    <article className="order-4 post-content lg:col-start-2 lg:row-start-2">
      <LightBoxProvider images={galleryImages}>
        <BlockRenderer blocks={postData.content} />
        <Lightbox />
      </LightBoxProvider>
    </article>
  </div>
)
}
9