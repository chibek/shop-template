"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import * as Icons from "@/components/icons";
import { useSelectedLayoutSegment } from "next/navigation";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={cn("flex flex-col gap-2 group")} {...props}>
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
                "gap-1 flex w-full items-center rounded-md p-2 hover:bg-muted hover:text-foreground leading-3 text-sm overflow-hidden",
                item.href.includes(String(segment))
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-5 flex-none" />
              <span className="whitespace-nowrap sm:opacity-100 opacity-0 transition-opacity group-hover:opacity-100 delay-95 duration-500">{item.title}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
