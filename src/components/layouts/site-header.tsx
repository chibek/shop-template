import Link from "next/link"
import { type User } from "@clerk/nextjs/dist/types/server"

import UserAvatar from "@/components/avatar/avatar"
import HeaderLogin from "@/components/avatar/header-login"
import CartSheet from "@/components/cart/cart-sheet"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-sidebar-nav"

export interface SiteHeaderProps {
  user: User | null
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="w-full px-2 py-4 lg:px-4">
      <div className="container grid grid-cols-2 place-items-baseline gap-2 sm:grid-cols-3">
        <Link href={"/"} className="hidden text-center text-xs leading-3 lg:block">
          <h1 className="font-bold  tracking-widest">NOT SELLING</h1>
          <p className="text-muted-foreground text-[0.6rem]">selling nothing</p>
        </Link>
        <MainNav className="col-span-2 place-self-center lg:col-span-1"/>
        <MobileNav/>
        <div className="flex items-center gap-2 place-self-end">
          <CartSheet />
          {user ? <UserAvatar user={user} /> : <HeaderLogin />}
        </div>
      </div>
    </header>
  )
}
