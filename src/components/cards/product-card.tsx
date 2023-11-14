"use client";

import type { Product } from "@/types/types";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export default function ProductCard({
  product,
  className,
  ...props
}: ProductCardProps) {
    const addToCart = useCartStore(state => state.addToCart)

  return (
    <Card
      className={className}
      {...props}
    >
      <CardHeader>{product.name}</CardHeader>
      <CardFooter className="p-4">
        <Button onClick={() => {
            addToCart(product)
        }}> Add to card </Button>
      </CardFooter>
    </Card>
  );
}
