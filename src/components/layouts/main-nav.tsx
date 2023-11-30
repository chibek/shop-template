"use client"

import * as React from "react"
import Link from "next/link"
import type { NavItem, NavItemWithOptionalChildren } from "@/types"
import type * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import {siteConfig} from "@/config/home"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav({
  className,
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenu className={cn(className, "hidden sm:flex")}>
      <NavigationMenuList>
        {siteConfig.mainNav.map((item) =>
          item.items?.length ? (
            <NavigationMenuWithItems key={item.title} {...item} />
          ) : (
            <NavigationMenuWithoutItems key={item.title} {...item} />
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const NavigationMenuWithItems = (item: NavItemWithOptionalChildren) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          {item.items?.map((subItem) => (
            <ListItem
              key={subItem.title}
              href={subItem.href}
              title={subItem.title}
            >
              {subItem.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const NavigationMenuWithoutItems = ({ ...item }: NavItem) => {
  return (
    <NavigationMenuItem>
      <Link href={item.href} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {item.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
