import Image from "next/image"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default async function ProtectedAuthLayout({
  children,
}: React.PropsWithChildren) {
  const user = await currentUser()

  if (user) {
    redirect("/")
  }

  return (
    <div className="grid h-full min-h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/auth-layout.webp"
          alt="A montain landscape"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </AspectRatio>
      <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
  )
}
