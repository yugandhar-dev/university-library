import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bookworm",
  description:
    "Bookworm is a book borrowing university library management solution.",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}

export default RootLayout
