import { db } from "@/db"
import { products } from "@/db/schema"

import ProductCard from "@/components/cards/product-card"

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
      <section className="grid grid-cols-4 gap-4">
        {queryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  )
}
