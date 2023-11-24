"use client";

import type { Product } from "@/db/schema";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Placeholder } from "../icons";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export default function ProductCard({
  product,
  className,
  ...props
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  return (
    <Card
      className={cn(className, "h-full overflow-hidden rounded-sm")}
      {...props}
    >
      <CardHeader className="border-b p-0">
        <AspectRatio ratio={4 / 3}>
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
              loading="lazy"
            />
          ) : (
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="flex h-full w-full items-center justify-center bg-secondary"
            >
              <Placeholder
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {formatPrice(product.price)}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          aria-label="Add to cart"
          size="sm"
          className="h-8 w-full rounded-sm"
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to card
        </Button>
      </CardFooter>
    </Card>
  );
}
