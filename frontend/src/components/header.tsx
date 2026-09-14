import { useState } from 'react'
import { Route as RootRoute } from '@/routes/__root'
import { Link } from '@tanstack/react-router'
import { useTheme } from '#/context/themeContext'
import type { Theme } from '#/context/themeContext'



type Bounce = boolean | undefined

export default function Header() {
    const { header } = RootRoute.useLoaderData()
    const  [isBouncing, setIsBouncing] = useState<Bounce>(false)
  
    const { theme, selectTheme } = useTheme()

    const themes: Theme[] = ['blue', 'orange', 'black']

const handleBounce = () => {
     setIsBouncing(true)
     setTimeout(() => {
       setIsBouncing(false)
     }, 1000)
}



  const swatchColors: Record<Theme, string> = {
  blue: '#E0FAFF',
  orange: '#FF8C42',
  black: '#030303',
}

const ThemePicker = () => {
  return (
    <div className="flex gap-4 pt-2">
      {themes.map((name) => (
        <button
         disabled={isBouncing}
          key={name}
          type="button"
          onClick={() => {selectTheme(name); handleBounce()}}
          style={{ backgroundColor: swatchColors[name] }}
          className={`h-5 w-5 rounded-full ${theme === name ? 'ring-2 ring-black ring-offset-2' : ''}`}
          aria-label={`Switch to ${name} theme`}
        />
      ))}
    </div>
  )
}



    return(
    <header>
        <div className='flex flex-col items-center sm:flex-row sm:justify-between  '>
            <Link to='/' >
            <img className={`logo sm:self-end mt-5 ${isBouncing ? 'animate-custom-bounce' : null}`} src={header.logo.formats?.thumbnail?.url}
            alt={header.logo.alternativeText ?? "Notes and Waymarks logo"}/>
            </Link>
             <nav className='sm:self-end'>
                <ul className='flex gap-2'>
                    {header.menu.map(item => 
                        <li key={item.id}>{item.label}</li>
                    )}
                </ul>
            </nav>
        </div>
        <div className={`h-5 bg-primary rounded-2xl transition-all duration-150 ease-out ${isBouncing ? 'w-0' : 'w-full'}`}></div>
        <div className='flex justify-center flex-col items-center sm:block'>
            <div className='font-cabin text-lg sm:text-2xl text-gray-600'>{header.heading}</div>
            <ThemePicker />
        </div>
        
    </header>
)
}