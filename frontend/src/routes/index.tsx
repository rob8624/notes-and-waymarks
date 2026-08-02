import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    
      <main className='grid grid-cols-1 grid-rows-[auto_1fr] sm:grid-cols-[2fr_1fr] sm:grid-rows-1 pt-10  '>
        
        {/* artlices */}
        <section className='order-2 sm:order-1  flex flex-col sm:flex-row gap-2'>
          <div className='sm:flex-1 border-b-2 sm:border-b-0 sm:border-r-2'>
            <h1 className='sm:mt-4 text-2xl font-albert font-bold'>Articles</h1>
            <p className='font-cabin text-gray-500 italic'>To read, is to Learn</p>
          </div>
          <div className='sm:flex-4'>Post list</div>
        </section>
        
        
        
        {/* sidebar */}
        <section className='order-1 sm:order-2 bg-blue-600 flex sm:flex-col'>
          <div className='bg-yellow-200 flex-1'>Categories</div>
          <div className='bg-yellow-700 flex-2'>Picture of the moment</div>
        </section>
        
      </main>
      
    
  )
}
