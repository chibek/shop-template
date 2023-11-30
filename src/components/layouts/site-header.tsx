import { type User } from "@clerk/nextjs/dist/types/server";
import { MainNav } from "./main-nav";
import UserAvatar from "@/components/avatar/avatar";
import CartSheet from "@/components/cart/cart-sheet";
import HeaderLogin from "@/components/avatar/header-login";

export interface SiteHeaderProps {
  user: User | null;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="w-full p-4">
      <div className="container grid min-w-[635px] grid-cols-3 place-items-center gap-2">
        <MainNav className="col-span-2 md:col-span-1 md:col-start-2" />
        <div className="flex items-center gap-2 place-self-end">
          <CartSheet />
          {user ? <UserAvatar user={user} /> : <HeaderLogin />}
        </div>
      </div>
    </header>
  );
}
