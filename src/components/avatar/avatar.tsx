import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type SiteHeaderProps } from "@/components/layouts/site-header";
import { getUserEmail } from "@/lib/utils";
import LogOut from "./log-out";
import Link from "next/link";
import { type NavItem } from "../layouts/sidebar-nav";
import * as Icons from "@/components/icons";

export const avatarOptions: NavItem[] = [
  {
    title: "Profile",
    href: "/profile/dashboard",
    disabled: false,
    icon: "Dashboard",
  },
  {
    title: "My orders",
    href: "/profile/orders",
    disabled: false,
    icon: "OrderList",
  },
  {
    title: "Favorites",
    href: "/profile/favorites",
    disabled: false,
    icon: "Favorites",
  },
  {
    title: "Admin",
    href: "/admin/products",
    disabled: false,
    icon: "Dashboard",
  },
];

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
          <p className="text-muted-foreground text-xs leading-none">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {avatarOptions.map((item, key) => {
          const Icon = item.icon ? Icons[item.icon] : Icons["Dashboard"];

          return (
            <DropdownMenuItem key={key} className="flex gap-1" asChild>
              <Link href={item.href}>
                <Icon aria-hidden="true" className="h-4 w-5 flex-none" />
                {item.title}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
