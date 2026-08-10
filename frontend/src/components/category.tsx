import type { ICategoriesData } from '#/types/strapi-types'
import { Link } from '@tanstack/react-router'

interface CategoryProps {
  categories: ICategoriesData[]
  activeCategory: string | undefined
}


export function Category({ categories, activeCategory }:CategoryProps) {
    return (
           <div className='flex gap-1'>
                        <Link to="." search={(prev) => ({...prev, category:undefined})}
                        className={`${
            activeCategory ? "bg-primary text-black p-2  border-black border-4 rounded-2xl hover:scale-110  font-cabin" : null
          } `}>{activeCategory && 'All Posts'}
                        
                        </Link>
                        {categories.map(cat => 
                        <Link key={cat.slug} to="." search={(prev) => ({...prev, category: cat.slug, page: 1 }) }
                        className='bg-black text-white 
                        border-primary 
                        border-7 rounded-2xl 
                        hover:scale-110 
                        p-2 font-cabin'>{cat.name}</Link>)}
        </div>
    )
}