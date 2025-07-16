"use client"

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import Header from './Header'

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <ThemeProvider attribute="class">
      <Header/>
      {children}
    </ThemeProvider>
  )
}
