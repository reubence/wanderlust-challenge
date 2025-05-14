import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wanderlust - Travel Search",
  description: "Find your next adventure with our intelligent search",
<<<<<<< HEAD
  generator: 'v0.dev'
=======
    generator: 'v0.dev'
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    // Added `suppressHydrationWarning` to prevent hydration mismatch error 
    // caused by client-side changes to the <html> tag (e.g., dark/light theme class)
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider manages class on <html>, like "dark" or "light" */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
=======
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
