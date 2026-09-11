import { createFileRoute } from '@tanstack/react-router'
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

  const addImage = (image: IStrapiMedia) => {
    if (!seenIds.has(image.id)) {
      seenIds.add(image.id)
      images.push(image)
    }
  }

  for (const block of postData.content) {
    if (block.__component === 'blocks.image') {
      addImage(block.singleImage.image)
    }

    if (block.__component === 'blocks.multiple-images') {
      block.images.forEach(addImage)
    }
  }

  return images
}

  const galleryImages = getGalleryImages()
 
 
 if (!postData) {
    return <div>Post not found</div>
  }

 
  return (
  <div className="flex flex-col gap-2 mt-10 lg:grid lg:grid-cols-[20%_1fr]">
   <div className='block lg:hidden text-xs uppercase text-primary bg-black w-fit p-1'>{postData.categories.map((item) => item.name)}</div>
    <div className='flex flex-col items-center justify-center order-1'>
      
      <h1 className="flex items justify-center  text-4xl lg:text-5xl font-cabin md:col-start-2 tracking-tight mb-5">
        {postData.title}
        
      </h1>
      <div className='tracking-tight font-albert text-lg'>{postData.summary}</div>
    </div>

    <PostSideBar
      author={postData.author}
      publishedDate={postData.createdAt}
      updatedDate={postData.updatedAt}
      categories={postData.categories}
      className="order-2 border-r-0 
      md:order-1 md:row-span-2 md:col-start-1 md:row-start-1 lg:border-r-2 md:border-t-0 lg:p-4 "
    />

    <article className="order-3 md:col-start-2 post-content">
      <LightBoxProvider images={galleryImages}>
        <BlockRenderer blocks={postData.content} />
        <Lightbox />
      </LightBoxProvider>
    </article>

  </div>
)

}
