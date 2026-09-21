import { useState, useEffect } from 'react'
import { Route as RootRoute } from '@/routes/__root'
import { Link } from '@tanstack/react-router'
import { useTheme } from '#/context/themeContext'
import type { Theme } from '#/context/themeContext'



type Bounce = boolean | undefined
type Scroll = boolean | undefined

export default function Header() {
    const { header } = RootRoute.useLoaderData()
    const  [isBouncing, setIsBouncing] = useState<Bounce>(false)
   const [Isscrolling, setIsScrolling] = useState<Scroll>(false)
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
    <div className="flex gap-4 pt-2 bg-white pb-2 ">
      {themes.map((name) => (
        <button
         disabled={isBouncing}
          key={name}
          type="button"
          onClick={() => {selectTheme(name); handleBounce()}}
          style={{ backgroundColor: swatchColors[name] }}
          className={`h-3 w-3 md:h-5 md:w-5 rounded-full ${theme === name ? 'ring-2 ring-black ring-offset-2' : ''}`}
          aria-label={`Switch to ${name} theme`}
        />
      ))}
    </div>
  )
}

useEffect(() => {
  const onScroll = () => {
    const y = window.scrollY
    setIsScrolling(prev => (prev ? y > 30 : y > 120))
  }


  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener("scroll", onScroll);

}, [])



    return(
      <>
      <div
  className={`sticky top-0 z-10 bg-white pt-2 transition-[height] duration-300 ease-out ${
    Isscrolling ? 'h-16' : 'h-32 md:h-26'
  }`}
>
      { Isscrolling ?
      <header>
        <div className='flex justify-between pl-2 pr-2 pb-1'>
        <Link to='/' >
            <img className={`logo sm:self-end ${isBouncing ? 'animate-custom-bounce' : null}`} src={header.logo.formats?.thumbnail?.url}
            alt={header.logo.alternativeText ?? "Notes and Waymarks logo"}/>
            </Link>
            
            <ThemePicker />
          </div>
      <div className={`h-2 bg-primary  transition-all duration-150 ease-out ${isBouncing ? 'w-0' : 'w-full'}`}></div>      
    </header> :
    <header id="header" className=" bg-white/25 pb-2 ">
        <div id="header-content" className={`flex flex-col items-center sm:flex-row sm:justify-between h-fit`}>
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
        <div className='flex justify-center flex-col items-center sm:block bg-white'>
            <div className='font-cabin text-lg sm:text-2xl text-gray-600'>{header.heading}</div>
            <ThemePicker />
        </div>
        
    </header> }
    </div>
    </>
)
}