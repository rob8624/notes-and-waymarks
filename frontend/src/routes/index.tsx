import { createFileRoute } from '@tanstack/react-router'
import { Route as RootRoute } from '@/routes/__root'

//components
import { PostCard } from '#/components/postCard'

export const Route = createFileRoute('/')({ component: Home })


function Home() {
  const { siteSettings, posts } = RootRoute.useLoaderData()

  return (
    
      <main className='grid grid-cols-1 grid-rows-[auto_1fr] sm:grid-cols-[2fr_1fr] sm:grid-rows-1 pt-10  '>
        
        {/* artlices */}
        <section className='order-2 sm:order-1  flex flex-col sm:flex-row gap-2'>
          <div className='sm:flex-1 border-b-2 sm:border-b-0 sm:border-r-2 pr-2'>
            <h1 className='sm:mt-4 text-2xl font-albert font-bold'>Articles</h1>
            <p className='font-cabin text-gray-500 italic'>{siteSettings.articleMessage}</p>
          </div>
          <div className='sm:flex-4 flex flex-col'>
            <div>Post list</div>
            <div>{posts.map(posts => <PostCard key={posts.documentId} {...posts}/>)}</div>
          </div>
          
        </section>
        
        
        
        {/* sidebar */}
        <section className='order-1 sm:order-2 flex sm:flex-col gap-2'>
          <div className='bg-yellow-200 flex-1'>Categories</div>
          <div className='flex-2 flex justify-center items-center'>
            <div className='flex flex-col'>
              <h2>
                <span className='font-cabin text-4xl italic'>Image</span> 
                <span className='font-albert text-2xl text-gray-500'> of the moment.....</span>
              </h2>
               <p className='m-0 font-albert text-sm'>{siteSettings.momentImage.caption}</p>
              <img className="border-4" src={siteSettings.momentImage.formats?.medium?.url ?? siteSettings.momentImage.url} 
              alt={siteSettings.momentImage.alternativeText ?? 'Image of the moment'}  />
              
            </div>
          </div>
        </section>
        
      </main>
      
    
  )
}
