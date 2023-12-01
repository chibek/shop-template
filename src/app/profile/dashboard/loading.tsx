import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div>
      <section className="px-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm">
          Manage your profile settings
        </p>
        <Separator className="my-4" />
      </section>
      <section className="grid gap-10 rounded-lg border p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
      </section>
    </div>
  )
}
