import { ErrorCard } from "@/components/cards/not-found-card"

export default function PageNotFound() {
  return (
    <div className="m-auto flex min-h-screen max-w-md items-center justify-center">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </div>
  )
}
