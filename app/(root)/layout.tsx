import { auth } from "@/auth"
import Header from "@/components/Header"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if (!session) redirect("/sign-in")

  return (
    <main className="root-container">
      <Header session={session} />
      <div className="mt-20 pb-20">{children}</div>
    </main>
  )
}

export default Layout
