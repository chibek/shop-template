import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "@/components/icons";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CartSheet() {
  const { cart, totalItems, totalPrice } = useCartStore((state) => state);

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}