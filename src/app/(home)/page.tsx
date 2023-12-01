import React from "react"
import { db } from "@/db"
import { products } from "@/db/schema"

import ProductCard from "@/components/cards/product-card"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"

export default async function Home() {
  const queryProducts = await db.select().from(products)
  return (
    <>
      <section className="content-grid full-width gap-y-4 py-24 text-center">
        <h1 className="breakout text-balance text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          An e-commerce skateshop built with everything new in Next.js
        </h1>
        <p className="text-muted-foreground max-w-[42rem] place-self-center">
          Buy and sell sksateboarding gears from independent brands and stores
          around the world with ease
        </p>
      </section>
      <section className="content-grid full-width">
        <div className="max-size grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          <React.Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          >
            {queryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </React.Suspense>
        </div>
      </section>
    </>
  )
}
