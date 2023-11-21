import { NavItem, SidebarNav } from "@/components/layouts/sidebar-nav";
import { SiteHeader } from "@/components/layouts/site-header";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  ];

export default async function AdminLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="container max-w-[120rem] grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] pt-6 gap-6 flex-1 transition-all">
        <aside className="border-r pr-4 md:w-full md:hover:w-full w-[50px] hover:w-[170px] duration-300 transition-all group">
            <SidebarNav items={sidebarOptions} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
