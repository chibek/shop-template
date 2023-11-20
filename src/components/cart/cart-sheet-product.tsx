import { formatPrice } from "@/lib/utils";
import { Placeholder } from "../icons";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import NumberInput from "../number-input";
import type { Product } from "@/db/schema";

interface CartProductInterface  extends Product {quantity: number};

export default function CartSheetProduct({name, quantity, price} : CartProductInterface) {
  return (
    <div className="grid grid-cols-5 items-center gap-2 place-items-center ">
      <div
        aria-label="Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className="flex items-center justify-center bg-secondary rounded-sm aspect-square h-16 w-16"
      >
        <Placeholder
          className="h-9 w-9 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col col-span-2 place-self-center pl-2 justify-self-start max-w-full gap-1">
        <span className="truncate">{name}</span>
        <span className="text-xs text-muted-foreground">
          {formatPrice(price)} x {quantity} ={" "}
          {formatPrice((Number(price) * Number(quantity)).toFixed(2))}
        </span>
        <span className="text-xs text-muted-foreground">
          Qty {quantity}
        </span>
      </div>
      <NumberInput min={0} value={quantity}/>
      <Button
        aria-label="Delete product"
        variant="outline"
        size="icon"
        className="relative"
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
