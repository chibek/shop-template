import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SiteHeaderProps } from "@/components/layouts/site-header";
import { getUserEmail } from "@/lib/utils";
import LogOut from "./log-out";
import Link from "next/link";
import { Dashboard, Favorites, OrderList } from "@/components/icons";

export default function UserAvatar({ user }: SiteHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;
  const email = getUserEmail({ user });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} alt={user?.username ?? ""} />
          <AvatarFallback className="text-xs leading-none">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col gap-1">
          <p className="text-sm font-medium leading-none">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs leading-none text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-1" asChild>
          <Link href="/profile/dashboard">
            <Dashboard />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1" asChild>
          <Link href="/profile/orders">
            <OrderList />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1" asChild>
          <Link href="/profile/favorites">
            <Favorites />
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
