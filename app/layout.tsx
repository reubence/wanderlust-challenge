import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wanderlust - Travel Search",
  description: "Find your next adventure with our intelligent search",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
