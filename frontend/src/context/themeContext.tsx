import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

export type Theme = 'blue' | 'orange' | 'black'

const THEME_STORAGE_KEY = 'site-theme'

interface ThemeContextType {
  theme: Theme
  selectTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

function isValidTheme(value: unknown): value is Theme {
  return value === 'blue' || value === 'orange' || value === 'black'
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('blue')

  // Runs only on the client, after mount — safe to touch localStorage here
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (isValidTheme(stored)) {
      setTheme(stored)
      document.documentElement.dataset.theme = stored
    }
  }, [])

  const selectTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme)
    document.documentElement.dataset.theme = selectedTheme
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}