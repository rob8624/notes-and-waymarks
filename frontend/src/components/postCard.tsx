
import { Link } from '@tanstack/react-router'
import type { IPostData } from "#/types/strapi-types"





export function PostCard({title, slug, categories, summary, featuredImage}: IPostData) {
    return (
        
        <div className="flex flex-col m-2 lg:flex-row md:justify-center md:items-center flex-wrap">
        <div className="sm:pl-10 grid grid-rows-[3fr_1fr] sm:grid-cols-[2fr_1fr] sm:grid-rows-1 
        bg-primary/60  border-2 rounded-md min-h-60 md:w-[700px] lg:w-[500px]">
              
                <Link to="/posts/$postSlug" params={{ postSlug: slug }} className='bg-white  flex flex-col'>
                    
                    <div className='border-b-2 text-3xl font-cabin p-2 bg-primary/30'>{title}</div>
                    <div className='p-2 flex flex-col justify-between h-full'>
                        <div className='text-sm font-albert'>{summary}</div>
                        <div className='hidden sm:flex gap-2 flex-wrap bg-pr '>
                            {categories.map(item => 
                            <div key={item.id} className='text-on-primary rounded-sm p-1 font-albert capitalize w-fit bg-primary/60'>{item.name}</div>)}
                        </div>

                    </div>
                    
                </Link>
                
                <div className='justify-self-end self-end flex justify-between w-full'>
                    <div className='flex sm:hidden gap-2 flex-wrap mb-2 '>
                            {categories.map(item => 
                            <div key={item.id} className='bg-primary text-on-primary  rounded-sm p-1 font-albert capitalize w-fit'>{item.name}</div>)}
                        </div>
                     <Link to="/posts/$postSlug" params={{ postSlug: slug }} className='ml-auto'>
                        <div className='bg-white p-1 rounded-sm mr-1'>Read</div>
                    </Link>
                    
                </div>
            
        </div>
        </div>
)
}




{/* <div className="flex flex-col m-2 lg:flex-row md:justify-center md:items-center flex-wrap  ">
            <div className="flex bg-primary/60  border-2 rounded-md min-h-60 md:w-[700px] lg:w-[500px]" >
                <div className="flex flex-col flex-1  ml-10 bg-white p-2 min-w-[200px]">   
                    <div className="flex-1 flex justify-start items-end border-b-2 font-cabin font-bold text-2xl pb-2">
                        {title}
                    </div>
                    <div className="flex-2 font-albert text-gray-700 text-sm pb-1">{summary}</div>
                    <div className='flex gap-1 flex-wrap'>{categories.map(item => <div key={item.id} className='bg-primary text-on-primary  rounded-sm p-1 font-albert capitalize'>{item.name}</div>)}</div>
                    
                </div> 
            
            <div className="flex-1 flex justify-end items-end">
                    <Link to="/posts/$postSlug" params={{ postSlug: slug }} className=' h-10 
                    pr-5 pl-5 border-t-2 border-l-2 rounded-tl-lg font-albert  bg-white'>
                    <div className='hover:scale-125 pt-2 text-black'>Read</div>
                    </Link>
                </div>
            </div>
            
        </div> */}