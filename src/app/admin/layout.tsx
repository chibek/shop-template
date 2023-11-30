import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { type NavItem, SidebarNav } from "@/components/layouts/sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"

const sidebarOptions: NavItem[] = [
  {
    title: "Profile",
    href: "/admin/dashboard",
    disabled: false,
    icon: "Dashboard",
  },
  {
    title: "My orders",
    href: "/admin/orders",
    disabled: false,
    icon: "OrderList",
  },
  {
    title: "Favorites",
    href: "/admin/favorites",
    disabled: false,
    icon: "Favorites",
  },
]

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="container grid max-w-[120rem] flex-1 grid-cols-[auto_minmax(0,1fr)] gap-6 pt-6 transition-all md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="group w-[50px] border-r pr-4 transition-all duration-300 hover:w-[170px] md:w-full md:hover:w-full">
          <SidebarNav items={sidebarOptions} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
