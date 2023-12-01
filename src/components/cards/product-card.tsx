"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/db/schema"
import { useCartStore } from "@/store/cart-store"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Placeholder } from "../icons"
import { PlaceholderImage } from "../placeholder-image"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
}

export default function ProductCard({
  product,
  className,
  ...props
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <Card
      className={cn(className, "h-full overflow-hidden rounded-lg")}
      {...props}
    >
      <Link href={`/products/${product.id}`}>
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
            ) : <PlaceholderImage asChild={true} className="h-full rounded-b-none"/>}
          </AspectRatio>
        </CardHeader>
        <CardContent className="grid gap-1 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="px-4 pb-3">
        <Button
          aria-label="Add to cart"
          size="sm"
          className="h-8 w-full rounded-sm"
          onClick={() => {
            addToCart(product)
          }}
        >
          Add to card
        </Button>
      </CardFooter>
    </Card>
  )
}
