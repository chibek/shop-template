"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cart-store"
import useStore from "@/store/useStore"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Cart } from "@/components/icons"

import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { CartSheetEmpty } from "./cart-sheet-empty"
import CartSheetProduct from "./cart-sheet-product"

export default function CartSheet() {
  const cartStore = useStore(useCartStore, (state) => state)
  if (!cartStore) {
    return (
      <Button
        aria-label="Open cart"
        variant="outline"
        size="icon"
        className="relative"
      >
        <Cart className="h-4 w-4" aria-hidden="true" />
      </Button>
    )
  }
  const { totalItems, cart, totalPrice } = cartStore

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {totalItems > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5"
            >
              {totalItems}
            </Badge>
          )}
          <Cart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col md:max-w-xl">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {totalItems > 0 && `(${totalItems})`}</SheetTitle>
          <Separator />
        </SheetHeader>
        {totalItems ? (
          <ScrollArea className="h-full">
            <ul className="flex flex-col gap-4">
              {cart.map((product) => (
                <li key={product.id}>
                  <CartSheetProduct {...product} />
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <CartSheetEmpty />
        )}
        <Separator />
        <SheetFooter className="mt-4 flex items-center justify-between gap-4 sm:flex-col">
          <div className="flex w-full items-center justify-between px-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>

          <SheetTrigger asChild>
            <Link
              aria-label="View your cart"
              href="/cart"
              className={buttonVariants({
                size: "sm",
                className: "w-full",
              })}
            >
              Continue to checkout
            </Link>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
