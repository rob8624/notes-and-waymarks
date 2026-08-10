import { createFileRoute } from '@tanstack/react-router'
import { stripSearchParams } from '@tanstack/react-router'
import { Route as RootRoute } from '@/routes/__root'
import { Link } from '@tanstack/react-router'
import {  z } from 'zod'

//server functions
import { getAllCategoryData, getPostsData } from '#/data/server-functions'

//components
import { PostCard } from '#/components/postCard'

import { Pagination } from '#/components/pagination'
import { Category } from '#/components/category'
import { ImageOfTheMoment } from '#/components/imageOfTheMoment'
import { HomePageBook } from '#/components/homePageBook'


const defaultValues = {
  page: 1,
  order: 'desc',
}

const searchSchema = z.object({
  category: z.string().optional(),
  page: z.coerce.number().min(1).default(defaultValues.page),
  order: z.string().optional().default(defaultValues.order),
})




export const Route = createFileRoute('/')({ 
  validateSearch: searchSchema,

   search: {
    middlewares: [stripSearchParams(defaultValues)],
  },

  loaderDeps: ({ search }) => ({
    page: search.page,
    category: search.category,
    order: search.order,
  }),
  
  loader : async ({ deps }) => {
    const [posts, categories] = await Promise.all([getPostsData({ data: deps }), getAllCategoryData()])
    
    return {posts, categories}
    
  },

  component: Home

})


function Home() {
  const { siteSettings } = RootRoute.useLoaderData()
  const data = Route.useLoaderData()
  const posts = data.posts.data
  const categories = data.categories.data
  const totalPages = data.posts.meta.pagination.pageCount
  //gives u search params of route to by used in inline JSX eg...!search.category
  const search = Route.useSearch()
  
  return (
    
      <main className='grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[3fr_1fr] md:grid-rows-1 pt-10 '>
        
        {/* artlices */}
        <section className='order-2 md:order-1  flex flex-col md:flex-row gap-2 mr-5 sm:border-r-2'>
          <div className='sm:flex-1 border-b-2 sm:border-b-0 sm:border-r-2 pr-2'>
            <h1 className='sm:mt-4 text-2xl font-albert font-bold bg-primary p-2 w-fit '>Articles</h1>
            <p className='font-cabin text-gray-500 italic'>{siteSettings.articleMessage}</p>
          </div>
          <div className='sm:flex-4 flex flex-col'>
            <Pagination page={search.page} totalPages={totalPages}/>
 
            <div className='flex gap-2 flex-col justify-evenly h-full'>
              {posts.map(posts => <PostCard key={posts.documentId} {...posts}/>)}
              
            </div>
            
          </div>
          
        </section>
        
        
        
        {/* sidebar */}
        <section className='order-1 lg:order-2 flex flex-col gap-2 mb-10 lg:mb-0 sm:h-[90%]'>
          <div className=' flex-1 order-2 md:order-1'>

            
            
            <div className='flex flex-col gap-1'>
              <div className='font-cabin text-2xl italic'>Article filter</div>
              <Category categories={categories} activeCategory={search.category} />
              
            </div>
          </div>
          <div className='flex-1'> This could be my welcome</div>
          <div className='flex-1 flex  gap-5 flex-col sm:items-start sm:justify-start order-1 md:order-2'>
            <div className='flex-1 '>
              <HomePageBook  data={siteSettings.homePageBook} /> 
            </div>
            <div className='flex flex-col flex-3 sm:flex-1'>
              <ImageOfTheMoment siteSettings={siteSettings}/>
            </div>
          
          </div>
        </section>
        
      </main>
      
    
  )
}
