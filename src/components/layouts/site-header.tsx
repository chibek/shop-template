import { User } from "@clerk/nextjs/dist/types/server";
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
      <div className="container grid grid-cols-3 gap-2 place-items-center">
        <MainNav className="col-start-2" />
        <div className="flex items-center gap-2 place-self-end">
          <CartSheet />
          {user ? <UserAvatar user={user} /> : <HeaderLogin />}
        </div>
      </div>
    </header>
  );
}
