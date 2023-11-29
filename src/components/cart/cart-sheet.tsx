"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "@/components/icons";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useStore from "@/store/useStore";
import { Separator } from "../ui/separator";
import CartSheetProduct from "./cart-sheet-product";

export default function CartSheet() {
  const cartStore = useStore(useCartStore, (state) => state);
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
    );
  }
  const { totalItems, cart, totalPrice } = cartStore;

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
      <SheetContent className="md:max-w-xl">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {totalItems > 0 && `(${totalItems})`}</SheetTitle>
          <Separator />
        </SheetHeader>
        <ul className="py-4">
          {cart.map((product) => (
            <li key={product.id}>
              <CartSheetProduct {...product} />
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
