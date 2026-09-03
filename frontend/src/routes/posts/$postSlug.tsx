import { createFileRoute } from '@tanstack/react-router'
import { getPostDetail } from '#/data/server-functions'
import { BlockRenderer } from '#/components/blockRenderer'
import {  z } from 'zod'
import { PostSideBar } from '#/components/postSideBar'

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

 
  return (
  <div className="flex flex-col gap-2 mt-10 md:grid md:grid-cols-[20%_1fr]">

    <h1 className="flex items justify-center order-1 text-4xl font-cabin md:col-start-2">
      {postData.title}
    </h1>

    <PostSideBar
      author={postData.author}
      publishedDate={postData.publishedAt}
      className="order-2 border-t-2 border-r-0 md:order-1 md:row-span-2 md:col-start-1 md:row-start-1 md:border-r-2 md:border-t-0"
    />

    <div className="order-3 md:col-start-2">
      <BlockRenderer blocks={postData.content} />
    </div>

  </div>
)

}
