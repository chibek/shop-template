import { SiteHeader } from "@/components/layouts/site-header";
import { currentUser } from "@clerk/nextjs";

export default async function HomeLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user}/>
      <main className="content-grid">
        {children}
      </main>
    </div>
  );
}
