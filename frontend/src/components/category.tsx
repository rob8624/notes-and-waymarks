import type { ICategoriesData } from '#/types/strapi-types'
import { Link } from '@tanstack/react-router'

interface CategoryProps {
  categories: ICategoriesData[]
  activeCategory: string | undefined
}

const buttonStyles = {
  shared: 'border-2 rounded-2xl hover:scale-110 font-cabin p-2 w-fit whitespace-nowrap',
  active: 'bg-primary text-black border-primary',
  notActive: 'bg-white text-black border-black opacity-25',
}

export function Category({ categories, activeCategory }: CategoryProps) {
  return (
    <div className='flex lg:gap-5 gap-1 flex-wrap'>
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