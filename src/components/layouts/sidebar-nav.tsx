"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import * as Icons from "@/components/icons";
import { useSelectedLayoutSegment } from "next/navigation";
import { type UserRole } from "@/types";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  role?: UserRole;
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export function SidebarNav({ items, ...props }: SidebarNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={cn("group flex flex-col gap-2")} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : Icons["Dashboard"];

        return (
          <Link
            aria-label={item.title}
            key={index}
            href={item.href}
          >
            <span
              className={cn(
                "hover:bg-muted hover:text-foreground flex w-full items-center gap-1 overflow-hidden rounded-md p-2 text-sm leading-3",
                item.href.includes(String(segment))
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-5 flex-none" />
              <span className="delay-95 whitespace-nowrap opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:opacity-100">{item.title}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
