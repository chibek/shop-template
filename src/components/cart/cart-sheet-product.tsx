import { formatPrice } from "@/lib/utils";
import { Placeholder } from "../icons";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import NumberInput from "../number-input";
import type { Product } from "@/db/schema";
import { useCartStore } from "@/store/cart-store";

interface CartProductInterface extends Product {
  quantity: number;
}

export default function CartSheetProduct({
  quantity,
  ...product
}: CartProductInterface) {
  const cartStore = useCartStore();

  return (
    <div className="grid grid-cols-5 place-items-center items-center gap-2 ">
      <div
        aria-label="Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className="bg-secondary flex aspect-square h-16 w-16 items-center justify-center rounded-sm"
      >
        <Placeholder
          className="text-muted-foreground h-9 w-9"
          aria-hidden="true"
        />
      </div>
      <div className="col-span-2 flex max-w-full flex-col gap-1 place-self-center justify-self-start pl-2">
        <span className="truncate">{product.name}</span>
        <span className="text-muted-foreground text-xs">
          {formatPrice(product.price)} x {quantity} ={" "}
          {formatPrice((Number(product.price) * Number(quantity)).toFixed(2))}
        </span>
        <span className="text-muted-foreground text-xs">Qty {quantity}</span>
      </div>
      <NumberInput
        min={0}
        value={quantity}
        decrement={() => cartStore.removeFromCart(product)}
        increment={() => cartStore.addToCart(product)}
      />
      <Button
        aria-label="Delete product"
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => cartStore.removeAllFromCart(product)}
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
