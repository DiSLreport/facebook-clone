"use client"
import { usePathname } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import Header from './Header'

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch
const pathname = usePathname();
const hideHeader = pathname === '/user-login';


  return (
    <div>
      {hideHeader?(
        <ThemeProvider attribute="class">
        {children}
        </ThemeProvider>
      )
        :(
          <ThemeProvider attribute="class">
          <Header/>
          {children}
          </ThemeProvider>
        )
        }
        </div>
        );
}
