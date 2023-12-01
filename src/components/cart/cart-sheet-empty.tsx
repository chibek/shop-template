import Link from "next/link"

import { cn } from "@/lib/utils"

import { Cart } from "../icons"
import { buttonVariants } from "../ui/button"
import { SheetTrigger } from "../ui/sheet"

export function CartSheetEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-1">
      <Cart
        className="text-muted-foreground mb-4 h-16 w-16"
        aria-hidden="true"
      />
      <div className="text-muted-foreground text-xl font-medium">
        Your cart is empty
      </div>
      <SheetTrigger asChild>
        <Link
          aria-label="Add items to your cart to checkout"
          href="/products"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              className: "text-sm text-muted-foreground",
            })
          )}
        >
          Add items to your cart to checkout
        </Link>
      </SheetTrigger>
    </div>
  )
}
