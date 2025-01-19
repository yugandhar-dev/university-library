import { auth } from "@/auth"
import Header from "@/components/Header"
import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { after } from "next/server"
import { ReactNode } from "react"

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()

  if (!session) redirect("/sign-in")

  // Get the user and see if the lastActivityDate is today
  const user = session?.user?.id
    ? await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1)
    : null

  if (
    user &&
    user[0] &&
    user[0].lastActivityDate === new Date().toISOString().slice(0, 10)
  )
    return

  after(async () => {
    if (!session?.user?.id) return
    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id))
  })

  return (
    <main className="root-container">
      <Header session={session} />
      <div className="mt-20 pb-20">{children}</div>
    </main>
  )
}

export default Layout
