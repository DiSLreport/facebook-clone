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

  const pathname = usePathname();
  const hideHeader = pathname === '/user-login';
  if (!mounted) return null // Prevent hydration mismatch



  return (
    
    <div>
      <ThemeProvider attribue="class">
        {!hideHeader && <Header></Header>}
        {children}
      </ThemeProvider>

    </div>
    

    //first option of conditional render:
    // <div>
    //   {hideHeader?(
    //     <ThemeProvider attribute="class">
    //     {/* <Header/> */}
    //     {children}
    //     </ThemeProvider>
    //   )
    //     :(
    //       <ThemeProvider attribute="class">
    //       <Header/>
    //       {children}
    //       </ThemeProvider>
    //     )
    //     }
    //     </div>
        );
}
