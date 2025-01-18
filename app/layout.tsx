import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bookworm",
  description:
    "Bookworm is a book borrowing university library management solution.",
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${poppins.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}

export default RootLayout
