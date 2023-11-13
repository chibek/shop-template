import { MainNav } from "@/components/layouts/main-nav";

export default async function HomeLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="content-grid">
        {children}
      </main>
    </div>
  );
}
