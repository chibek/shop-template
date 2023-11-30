import { type HandleOAuthCallbackParams } from "@clerk/types"

import { SSOCallback } from "@/components/auth/sso-callback"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <section className="container max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </section>
  )
}
