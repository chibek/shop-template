import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { avatarOptions } from "@/components/avatar/avatar"
import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"

export default async function ProductsLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="container flex w-full flex-col overflow-hidden py-10">{children}</main>
    </div>
  )
}
