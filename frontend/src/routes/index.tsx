import { createFileRoute } from '@tanstack/react-router'
import Header from '#/components/header'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    
      <div className="min-h-screen w-full max-w-7xl mx-auto grid grid-rows-[auto_1fr_auto] bg-pink-200">
        <Header/>
        <div>Content</div>
        <div>Footer</div>
      </div>
    
  )
}
