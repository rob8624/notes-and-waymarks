import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"


type theme = 'blue' | 'orange' | 'black'

interface ThemeContextType {
    theme: theme
    selectTheme: (theme : theme) => void
}




const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
    children: ReactNode
}


export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<theme>('blue')

    const themeColors = {
        blue: '#E0FAFF',
        orange: '#e89527',
        black: '#050505',
    }

    const selectTheme = (selectedTheme: theme) => {
        setTheme(selectedTheme)

        document.documentElement.style.setProperty(
            '--color-primary',
            themeColors[selectedTheme]
        )
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
