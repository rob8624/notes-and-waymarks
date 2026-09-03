import type { ICategoriesData } from '#/types/strapi-types'
import { Link } from '@tanstack/react-router'

interface CategoryProps {
  categories: ICategoriesData[]
  activeCategory: string | undefined
}

const buttonStyles = {
  shared: 'border-4 rounded-2xl hover:scale-110 font-cabin p-1 w-fit whitespace-nowrap',
  active: 'bg-primary text-black border-primary',
  notActive: 'bg-black text-white border-black',
}

export function Category({ categories, activeCategory }: CategoryProps) {
  return (
    <div className='flex gap-5'>
      <Link
        to="."
        search={(prev) => ({ ...prev, category: undefined, page: 1 })}
        className={`${buttonStyles.shared} ${!activeCategory ? buttonStyles.active : buttonStyles.notActive}`}
      >
        All Posts
      </Link>

      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to="."
          search={(prev) => ({ ...prev, category: cat.slug, page: 1 })}
          className={`${buttonStyles.shared} ${activeCategory === cat.slug ? buttonStyles.active : buttonStyles.notActive}`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}